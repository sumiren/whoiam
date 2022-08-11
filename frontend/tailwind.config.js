/* https://mantine.dev/theming/extend-theme/ */
const mantineColors = {
  m_dark: {
    0: "#C1C2C5",
    1: "#A6A7AB",
    2: "#909296",
    3: "#5C5F66",
    4: "#373A40",
    5: "#2C2E33",
    6: "#25262B",
    7: "#1A1B1E",
    8: "#141517",
    9: "#101113",
  },
  m_gray: {
    0: "#F8F9FA",
    1: "#F1F3F5",
    2: "#E9ECEF",
    3: "#DEE2E6",
    4: "#CED4DA",
    5: "#ADB5BD",
    6: "#868E96",
    7: "#495057",
    8: "#343A40",
    9: "#212529",
  },
  m_red: {
    0: "#FFF5F5",
    1: "#FFE3E3",
    2: "#FFC9C9",
    3: "#FFA8A8",
    4: "#FF8787",
    5: "#FF6B6B",
    6: "#FA5252",
    7: "#F03E3E",
    8: "#E03131",
    9: "#C92A2A",
  },
  m_pink: {
    0: "#FFF0F6",
    1: "#FFDEEB",
    2: "#FCC2D7",
    3: "#FAA2C1",
    4: "#F783AC",
    5: "#F06595",
    6: "#E64980",
    7: "#D6336C",
    8: "#C2255C",
    9: "#A61E4D",
  },
  m_grape: {
    0: "#F8F0FC",
    1: "#F3D9FA",
    2: "#EEBEFA",
    3: "#E599F7",
    4: "#DA77F2",
    5: "#CC5DE8",
    6: "#BE4BDB",
    7: "#AE3EC9",
    8: "#9C36B5",
    9: "#862E9C",
  },
  m_violet: {
    0: "#F3F0FF",
    1: "#E5DBFF",
    2: "#D0BFFF",
    3: "#B197FC",
    4: "#9775FA",
    5: "#845EF7",
    6: "#7950F2",
    7: "#7048E8",
    8: "#6741D9",
    9: "#5F3DC4",
  },
  m_indigo: {
    0: "#EDF2FF",
    1: "#DBE4FF",
    2: "#BAC8FF",
    3: "#91A7FF",
    4: "#748FFC",
    5: "#5C7CFA",
    6: "#4C6EF5",
    7: "#4263EB",
    8: "#3B5BDB",
    9: "#364FC7",
  },
  m_blue: {
    0: "#E7F5FF",
    1: "#D0EBFF",
    2: "#A5D8FF",
    3: "#74C0FC",
    4: "#4DABF7",
    5: "#339AF0",
    6: "#228BE6",
    7: "#1C7ED6",
    8: "#1971C2",
    9: "#1864AB",
  },
  m_cyan: {
    0: "#E3FAFC",
    1: "#C5F6FA",
    2: "#99E9F2",
    3: "#66D9E8",
    4: "#3BC9DB",
    5: "#22B8CF",
    6: "#15AABF",
    7: "#1098AD",
    8: "#0C8599",
    9: "#0B7285",
  },
  m_teal: {
    0: "#E6FCF5",
    1: "#C3FAE8",
    2: "#96F2D7",
    3: "#63E6BE",
    4: "#38D9A9",
    5: "#20C997",
    6: "#12B886",
    7: "#0CA678",
    8: "#099268",
    9: "#087F5B",
  },
  m_grean: {
    0: "#EBFBEE",
    1: "#D3F9D8",
    2: "#B2F2BB",
    3: "#8CE99A",
    4: "#69DB7C",
    5: "#51CF66",
    6: "#40C057",
    7: "#37B24D",
    8: "#2F9E44",
    9: "#2B8A3E",
  },
  m_lime: {
    0: "#F4FCE3",
    1: "#E9FAC8",
    2: "#D8F5A2",
    3: "#C0EB75",
    4: "#A9E34B",
    5: "#94D82D",
    6: "#82C91E",
    7: "#74B816",
    8: "#66A80F",
    9: "#5C940D",
  },
  m_yellow: {
    0: "#FFF9DB",
    1: "#FFF3BF",
    2: "#FFEC99",
    3: "#FFE066",
    4: "#FFD43B",
    5: "#FCC419",
    6: "#FAB005",
    7: "#F59F00",
    8: "#F08C00",
    9: "#E67700",
  },
  m_orange: {
    0: "#FFF4E6",
    1: "#FFE8CC",
    2: "#FFD8A8",
    3: "#FFC078",
    4: "#FFA94D",
    5: "#FF922B",
    6: "#FD7E14",
    7: "#F76707",
    8: "#E8590C",
    9: "#D9480F",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "768px",
      lg: "1400px"
    },
    extend: {
      color: mantineColors
    },
  },
  plugins: [],
}
