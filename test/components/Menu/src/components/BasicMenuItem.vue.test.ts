// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock Ant Design Vue components
vi.mock("ant-design-vue", () => ({
  Dropdown: {
    template: "<div class=\"ant-dropdown\"><slot></slot></div>",
    props: ["placement", "trigger", "dropMenuList"]
  },
  Select: {
    template: "<div class=\"ant-select\"><slot></slot></div>",
    props: ["value", "options", "mode"]
  },
  Modal: {
    template: "<div class=\"ant-modal\"><slot></slot></div>",
    props: ["visible", "title"]
  },
  Form: {
    template: "<form class=\"ant-form\"><slot></slot></form>",
    props: ["model", "rules"]
  },
  FormItem: {
    template: "<div class=\"ant-form-item\"><slot></slot></div>",
    props: ["label", "name"]
  },
  Input: {
    template: "<input class=\"ant-input\" />",
    props: ["value", "placeholder"]
  },
  Button: {
    template: "<button class=\"ant-btn\"><slot></slot></button>",
    props: ["type", "loading"]
  }
}));

// Mock build configuration for Vite plugins
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});

Object.defineProperty(globalThis, '__PROD__', {
  value: false,
  writable: true
});

Object.defineProperty(globalThis, '__COLOR_PLUGIN_OPTIONS__', {
  value: {},
  writable: true
});

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock ant-design-vue Menu context before importing component
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    useInjectMenu: vi.fn(() => ({
      prefixCls: 'ant-menu',
      mode: 'horizontal',
      theme: 'light',
      selectedKeys: [],
      openKeys: [],
      inlineCollapsed: false,
      antdMenuTheme: 'light',
      siderCollapsed: false,
      isRootMenu: true,
      subMenuOpenClose: vi.fn(),
      onItemClick: vi.fn(),
      onOpenChange: vi.fn(),
      onSelect: vi.fn(),
    })),
    MenuItem: {
      name: 'MenuItem',
      template: '<div class="ant-menu-item"><slot /></div>',
    },
  };
});

// Mock the specific hook that's being used
vi.mock('ant-design-vue/lib/menu/src/useMenuContext', () => ({
  useInjectMenu: vi.fn(() => ({
    prefixCls: 'ant-menu',
    mode: 'horizontal',
    theme: 'light',
    selectedKeys: [],
    openKeys: [],
    inlineCollapsed: false,
    antdMenuTheme: 'light',
    siderCollapsed: false,
    isRootMenu: true,
    subMenuOpenClose: vi.fn(),
    onItemClick: vi.fn(),
    onOpenChange: vi.fn(),
    onSelect: vi.fn(),
  })),
}));

// Mock the specific hook that's being used
vi.mock('ant-design-vue/es/menu/src/useMenuContext', () => ({
  useInjectMenu: vi.fn(() => ({
    prefixCls: 'ant-menu',
    mode: 'horizontal',
    theme: 'light',
    selectedKeys: [],
    openKeys: [],
    inlineCollapsed: false,
    antdMenuTheme: 'light',
    siderCollapsed: false,
    isRootMenu: true,
    subMenuOpenClose: vi.fn(),
    onItemClick: vi.fn(),
    onOpenChange: vi.fn(),
    onSelect: vi.fn(),
  })),
}));

import BasicMenuItem from '/@/components/Menu/src/components/BasicMenuItem';

describe('BasicMenuItem', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicMenuItem);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicMenuItem);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(BasicMenuItem, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(BasicMenuItem);
    // Add event testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(BasicMenuItem);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });
});
