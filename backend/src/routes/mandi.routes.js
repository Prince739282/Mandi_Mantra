import { Router } from "express";

const router = Router();

// Get states
router.get("/states", async (req, res) => {
  try {
    const params = new URLSearchParams({
      "api-key": process.env.GOV_API_KEY,
      format: "json",
      limit: "100",
    });

    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`,
    );

    const responseText = await response.text();

    console.log("Government API status:", response.status);
    console.log("Government API response:", responseText);

    if (!response.ok) {
      return res.status(500).json({
        message: "Government API request failed",
        status: response.status,
      });
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch (error) {
      return res.status(500).json({
        message: "Government API did not return JSON",
        response: responseText.substring(0, 200),
      });
    }

    if (!data.records) {
      return res.status(500).json({
        message: "No records received from Government API",
      });
    }

    const states = [
      ...new Set(data.records.map((record) => record.state).filter(Boolean)),
    ].sort();

    console.log("States found:", states);

    res.json(states);
  } catch (error) {
    console.log("State API error:", error);

    res.status(500).json({
      message: "State API error",
      error: error.message,
    });
  }
});

// Get districts or markets
router.get("/locations", async (req, res) => {
  try {
    const { state, district } = req.query;

    if (!state) {
      return res.status(400).json({
        message: "State is required",
      });
    }

    const params = new URLSearchParams({
      "api-key": process.env.GOV_API_KEY,
      format: "json",
      limit: "1000",
    });

    params.append("filters[state]", state);

    if (district) {
      params.append("filters[district]", district);
    }

    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`,
    );

    const responseText = await response.text();

    console.log("Government API status:", response.status);
    console.log("Government API response:", responseText);

    const data = JSON.parse(responseText);

    console.log("Location search:", {
      state,
      district,
      records: data.records?.length || 0,
    });

    if (!data.records) {
      return res.json([]);
    }

    const values = district
      ? [
          ...new Set(
            data.records.map((record) => record.market).filter(Boolean),
          ),
        ]
      : [
          ...new Set(
            data.records.map((record) => record.district).filter(Boolean),
          ),
        ];

    res.json(values);
  } catch (error) {
    console.log("Location API error:", error);

    res.status(500).json({
      message: "Failed to fetch locations",
    });
  }
});

// Get commodities for a particular market
router.get("/commodities", async (req, res) => {
  try {
    const { state, district, market } = req.query;

    if (!state || !district || !market) {
      return res.status(400).json({
        message: "State, district and market are required",
      });
    }

    const params = new URLSearchParams({
      "api-key": process.env.GOV_API_KEY,
      format: "json",
      limit: "1000",
    });

    params.append("filters[state]", state);
    params.append("filters[district]", district);
    params.append("filters[market]", market);

    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`,
    );

    const data = await response.json();

    console.log("Commodity search:", {
      state,
      district,
      market,
      records: data.records?.length || 0,
    });

    if (!data.records) {
      return res.json([]);
    }

    const commodities = [
      ...new Set(
        data.records.map((record) => record.commodity).filter(Boolean),
      ),
    ];

    res.json(commodities);
  } catch (error) {
    console.log("Commodity API error:", error);

    res.status(500).json({
      message: "Failed to fetch commodities",
    });
  }
});

// Get commodities for a district
router.get("/district-commodities", async (req, res) => {
  try {
    const { state, district } = req.query;

    if (!state || !district) {
      return res.status(400).json({
        message: "State and district are required",
      });
    }

    const params = new URLSearchParams({
      "api-key": process.env.GOV_API_KEY,
      format: "json",
      limit: "1000",
    });

    params.append("filters[state]", state);
    params.append("filters[district]", district);

    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`,
    );

    const data = await response.json();

    console.log("District commodity search:", {
      state,
      district,
      records: data.records?.length || 0,
    });

    if (!data.records) {
      return res.json([]);
    }

    const commodities = [
      ...new Set(
        data.records.map((record) => record.commodity).filter(Boolean),
      ),
    ];

    res.json(commodities);
  } catch (error) {
    console.log("District commodity API error:", error);

    res.status(500).json({
      message: "Failed to fetch district commodities",
    });
  }
});

// Get mandi prices
router.get("/prices", async (req, res) => {
  try {
    const { commodity, state, district, market } = req.query;

    console.log("Price search:", {
      commodity,
      state,
      district,
      market,
    });

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

    console.log("Records found:", data.records?.length || 0);

    res.json(data);
  } catch (error) {
    console.log("Price API error:", error);

    res.status(500).json({
      message: "Failed to fetch mandi prices",
    });
  }
});

export default router;
