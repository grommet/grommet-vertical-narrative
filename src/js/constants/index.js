export const LARGER_COHERT = [
  {
    axis: {
      labels: [
        {"index": 0, "label": "15"},
        {"index": 6, "label": "35"} ],
      count: 7
    },
    data: [4.24, 4.18, 4.19, 4.21, 4.25, 4.36, 4.45,
    4.55, 4.65, 4.73, 4.55, 4.25, 4.36, 4.32, 4.35],
    max: 5,
    min: 2,
    title: 'Millennials',
    units: 'M'
  },
  {
    axis: {
      labels: [
        {"index": 0, "label": "36"},
        {"index": 6, "label": "50"} ],
      count: 7
    },
    data: [4.12, 4.22, 3.99, 3.88, 3.32, 3.45, 3.55,
    3.65, 3.75, 3.53, 3.55, 3.25, 3.36, 4.32, 4.35],
    max: 5,
    min: 2,
    title: 'Gen X',
    units: 'M'
  },
  {
    axis: {
      labels: [
        {"index": 0, "label": "51"},
        {"index": 6, "label": "70"} ],
      count: 7
    },
    data: [4.35, 4.18, 4.19, 4.12, 4.15, 3.95, 3.65,
    3.55, 3.65, 3.73, 3.55, 3.35, 2.85, 2.65, 2.55],
    max: 5,
    min: 2,
    title: 'Baby Boomers',
    units: 'M'
  }
];

export const FIRST_DIGITAL_NATIVES = {
  axis: { 
    data: [ {index: 3, label: 75}, {index: 2, label: 50} ],
    count: 4
  },
  series: [
    {
      title: 'Play Video Games',
      data: [
        {
          colorIndex: 'accent-1',
          label: 'Millennials',
          units: '%',
          value: 48
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Gen X',
          units: '%',
          value: 30
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Baby Boomers',
          units: '%',
          value: 25
        }
      ],
      max: 75
    },
    {
      title: 'Play Video Games',
      data: [
        {
          colorIndex: 'accent-1',
          label: 'Millennials',
          units: '%',
          value: 43
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Gen X',
          units: '%',
          value: 35
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Baby Boomers',
          units: '%',
          value: 30
        }
      ],
      max: 75
    },
    {
      title: 'Play Video Games',
      data: [
        {
          colorIndex: 'accent-1',
          label: 'Millennials',
          units: '%',
          value: 55
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Gen X',
          units: '%',
          value: 45
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Baby Boomers',
          units: '%',
          value: 40
        }
      ],
      max: 75
    }
  ],
  legend: {
    data: [
      {
        "label": 'Millennials',
        "colorIndex": "accent-1"
      },
      {
        "label": 'Gen X',
        "colorIndex": "accent-2"
      },
      {
        "label": 'Baby Boomers',
        "colorIndex": "neutral-2"
      }
    ],
    units: '%'
  }
};

export const SOCIAL_AND_CONNECTED = {
  series: [
   {"label": "Boomers", "value": 4.6,
    "colorIndex": "neutral-2"},
    {"label": "Gen X", "value": 10.2,
      "colorIndex": "accent-2"},
    {"label": "Millennials", "value": 22.5,
      "colorIndex": "accent-1"}
  ],
  units: 'm',
  max: 22.5,
  min: 0
};

export const LESS_MONEY_TO_SPEND = {
  axis: {
    large: {
      series: [
        {"index": 0, "label": "2000"},
        {"index": 2, "label": "2002"},
        {"index": 4, "label": "2004"},
        {"index": 6, "label": "2006"},
        {"index": 8, "label": "2008"},
        {"index": 10, "label": "2010"},
        {"index": 12, "label": "2012"}
      ],
      count: 13
    },
    small: {
      series: [
        {"index": 0, "label": "2000"},
        {"index": 3, "label": "2006"},
        {"index": 5, "label": "2012"}
      ],
      count: 6
    }
  },
  max: 69,
  min: 62,
  title: "Less Money to Spend",
  series: [
    {
      values: [69, 69, 68, 67, 66, 65, 66, 66, 
        66, 64, 64, 63, 64],
      units: "%",
      colorIndex: "accent-1"
    }
  ]
};

export const BEYOND_THE_BRAND = {
  axis: {
    labels: [
      {index: 4, label: '100%'},
      {index: 2, label: 50} ],
    count: 5
  },
  chart: [
    {
      title: '16 - 24',
      series: [
        {
          colorIndex: 'grey-1',
          label: `Don't Know`,
          units: '%',
          value: 15
        }, 
        {
          colorIndex: 'grey-4',
          label: 'Strongly Disagree',
          units: '%',
          value: 15
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Tend to Disagree',
          units: '%',
          value: 25
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Tend to Agree',
          units: '%',
          value: 35
        }, 
        {
          colorIndex: 'accent-1',
          label: 'Strongly Agree',
          units: '%',
          value: 10
        }
      ]
    },
    {
      title: '25 - 34',
      series: [
        {
          colorIndex: 'grey-1',
          label: `Don't Know`,
          units: '%',
          value: 5
        }, 
        {
          colorIndex: 'grey-4',
          label: 'Strongly Disagree',
          units: '%',
          value: 30
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Tend to Disagree',
          units: '%',
          value: 20
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Tend to Agree',
          units: '%',
          value: 25
        }, 
        {
          colorIndex: 'accent-1',
          label: 'Strongly Agree',
          units: '%',
          value: 20
        }
      ]
    },
    {
      title: '35 - 44',
      series: [
        {
          colorIndex: 'grey-1',
          label: `Don't Know`,
          units: '%',
          value: 10
        }, 
        {
          colorIndex: 'grey-4',
          label: 'Strongly Disagree',
          units: '%',
          value: 20
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Tend to Disagree',
          units: '%',
          value: 30
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Tend to Agree',
          units: '%',
          value: 30
        }, 
        {
          colorIndex: 'accent-1',
          label: 'Strongly Agree',
          units: '%',
          value: 10
        }
      ]
    },
    {
      title: '45 - 54',
      series: [
        {
          colorIndex: 'grey-1',
          label: `Don't Know`,
          units: '%',
          value: 15
        }, 
        {
          colorIndex: 'grey-4',
          label: 'Strongly Disagree',
          units: '%',
          value: 15
        }, 
        {
          colorIndex: 'neutral-2',
          label: 'Tend to Disagree',
          units: '%',
          value: 20
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Tend to Agree',
          units: '%',
          value: 40
        }, 
        {
          colorIndex: 'accent-1',
          label: 'Strongly Agree',
          units: '%',
          value: 10
        }
      ]
    }
  ],
  legend: [
    {
      label: 'Strongly Agree',
      colorIndex: 'accent-1',
      units: '%'
    },
    {
      label: 'Tend to Agree',
      colorIndex: 'accent-2',
      units: '%'
    },
    {
      label: 'Tend to Disagree',
      colorIndex: 'neutral-2',
      units: '%'
    },
    {
      label: 'Strongly Disagree',
      colorIndex: 'grey-4',
      units: '%'
    },
    {
      label: 'Don\'t Know',
      colorIndex: 'grey-1',
      units: '%'
    }
  ]
};

export const CLICKING_TO_BUY = {
  axis: {
    percent: [
      {"index": 0, "label": "50"},
      {"index": 2, "label": "75"},
      {"index": 4, "label": "100%"}
    ],
    years: [
      {index: 0, label: 2008},
      {index: 4, label: 2012}
    ],
    count: 5
  },
  chart: [
    {
      label: "16 - 24",
      values: [66, 68, 77, 82, 80],
      units: "%",
      axisValues: [15, 16, 17, 18, 19],
      colorIndex: "accent-1",
      axisValuesUnits: "years old",
      pointColorIndex: "graph-1"
    },{
      label: "25 - 34",
      values: [60, 60, 62, 68, 70],
      units: "%",
      axisValues: [15, 16, 17, 18, 19, 20],
      colorIndex: "accent-1",
      axisValuesUnits: "years old",
      pointColorIndex: "graph-2"
    },{
      label: "35 - 44",
      values: [58, 55, 53, 55, 58],
      units: "%",
      axisValues: [15, 16, 17, 18, 19, 20],
      colorIndex: "accent-1",
      axisValuesUnits: "years old",
      pointColorIndex: "accent-1"
    }
  ]
};

export const SEARCHING_FOR_VALUE = {
  axis: {
    count: 5,
    labels: [
      {index: 4, label: '100%'},
      {index: 2, label: '50'} 
    ]
  },
  charts: [
    {
      title: 'Price',
      series: [
        {
          colorIndex: 'accent-1',
          label: 'Millennials',
          units: '%',
          value: 48
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Non-Millennials',
          units: '%',
          value: 30
        }
      ]
    },
    {
      title: 'Quality',
      series: [
        {
          colorIndex: 'accent-1',
          label: 'Millennials',
          units: '%',
          value: 43
        }, 
        {
          colorIndex: 'accent-2',
          label: 'Non-Millennials',
          units: '%',
          value: 35
        }
      ]
    }
  ],  
  legend: {
    series: [
      {
        "label": 'Millennials',
        "colorIndex": "accent-1"
      },
      {
        "label": 'Non-Millennials',
        "colorIndex": "accent-2"
      }
    ],
    units: '%'
  }
};

export const RENTER_GENERATION = {
  series: [
   {"label": "Boomers", "value": 4.6,
    "colorIndex": "neutral-2"},
  {"label": "Gen X", "value": 10.2,
    "colorIndex": "accent-2"},
  {"label": "Millennials", "value": 22.5,
    "colorIndex": "accent-1"}
  ],
  units: 'M',
  max: 22.5
};

export const CHANGING_OWNERSHIP = {
  charts: [
    {
      title: '2005',
      value: 52,
      units: "%",
      colorIndex: "accent-2"
    },
    {
      title: '2012',
      value: 60,
      units: "%",
      colorIndex: "accent-1"
    }
  ]
};
