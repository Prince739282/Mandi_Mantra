import { Router } from "express";

const router = Router();

router.get("/prices", async (req, res) => {
  try {
    const { commodity, state, district, market } = req.query;

    const params = new URLSearchParams({
      "api-key": process.env.GOV_API_KEY,
      format: "json",
      limit: "20",
    });

    if (commodity) {
      params.append("filters[commodity]", commodity);
    }

    if (state) {
      params.append("filters[state]", state);
    }

    if (district) {
      params.append("filters[district]", district);
    }

    if (market) {
      params.append("filters[market]", market);
    }

    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`,
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mandi prices",
    });
  }
});

export default router;
