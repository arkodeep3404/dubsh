const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Url } = require("../dbSchema");
const router = express.Router();
const zod = require("zod");

router.get("/urls", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const filter = req.query.filter || "";

  const urls = await Url.find({
    userId: userId,
    $or: [
      {
        customUrl: {
          $regex: filter,
        },
      },
      {
        originalUrl: {
          $regex: filter,
        },
      },
    ],
  });
});

router.get("/url/:customUrl", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const customUrl = req.params.customUrl;

  const url = await Url.find({
    userId: userId,
    customUrl: customUrl,
  });

  if (url) {
    res.status(200).json({
      url: url,
    });
  }
});

const urlBody = zod.object({
  originalUrl: zod.string(),
  customUrl: zod.string(),
});

router.post("/url", authMiddleware, async (req, res) => {
  const { success } = urlBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  if (!req.body.originalUrl) {
    return res.status(400).json({
      message: "original url not present",
    });
  }

  if (req.body.customUrl) {
    const existingUrl = await Url.findOne({
      customUrl: req.body.customUrl,
    });

    if (existingUrl) {
      res.status(409).json({
        message: "custom url already exists",
      });
    } else {
      const url = await Url.create({
        userId: req.userId,
        customUrl: req.body.customUrl,
        originalUrl: req.body.originalUrl,
        clickDetails: [],
      });

      if (url) {
        res.status(200).json({
          message: "custom url created",
          url: url.customUrl,
        });
      }
    }
  }

  if (!req.body.customUrl) {
    const uid = [...Array(10)]
      .map(() => Math.random().toString(36)[2])
      .join("");

    const existingUid = await Url.findOne({
      customUrl: uid,
    });

    if (existingUid) {
      const uid = [...Array(10)]
        .map(() => Math.random().toString(36)[2])
        .join("");

      const url = await Url.create({
        userId: req.userId,
        customUrl: uid,
        originalUrl: req.body.originalUrl,
        clickDetails: [],
      });

      if (url) {
        res.status(200).json({
          message: "custom url created",
          url: url.customUrl,
        });
      }
    } else {
      const url = await Url.create({
        userId: req.userId,
        customUrl: uid,
        originalUrl: req.body.originalUrl,
        clickDetails: [],
      });

      if (url) {
        res.status(200).json({
          message: "custom url created",
          url: url.customUrl,
        });
      }
    }
  }
});

router.delete("/url", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const urlId = req.query.urlId;

  const url = await Url.findOneAndDelete({
    userId: userId,
    _id: urlId,
  });

  if (url) {
    res.status(200).json({
      message: "entry deleted",
    });
  } else {
    res.status(200).json({
      message: "incorrect id",
    });
  }
});

router.get("/redirect/:customUrl", async (req, res) => {
  const customUrl = req.params.customUrl;

  const url = await Url.findOneAndUpdate(
    {
      customUrl: customUrl,
    },
    {
      $push: {
        clickDetails: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({
      message: "incorrect custom url",
    });
  }
});

router.get("/analytics/:customUrl", authMiddleware, async (req, res) => {
  const customUrl = req.params.customUrl;
  const userId = req.userId;

  const url = await Url.findOne({
    userId: userId,
    customUrl: customUrl,
  });

  if (url) {
    return res.status(200).json({
      totalVisitors: url.clickDetails.length,
      visitorDetails: url.clickDetails,
    });
  } else {
    res.status(401).json({
      message: "incorrect custom url",
    });
  }
});

module.exports = router;
