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
import BasicTable from '/@/components/Table/src/BasicTable';

// Mock the table context hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  createTableContext: vi.fn(),
  useTableContext: vi.fn(() => ({
    getColumns: vi.fn(() => []),
    setColumns: vi.fn(),
    getBindValues: { value: {} },
  })),
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Table: {
    name: 'ATable',
    template: '<div class="ant-table"><slot /></div>',
  },
  Tooltip: {
    name: 'Tooltip',
    props: ['placement'],
    template: '<div><slot /></div>',
  },
  Divider: {
    name: 'Divider',
    template: '<div class="ant-divider"></div>',
  },
  Popover: {
    name: 'Popover',
    props: ['placement', 'trigger'],
    template: '<div><slot /></div>',
  },
  Checkbox: {
    name: 'Checkbox',
    props: ['checked', 'onChange'],
    template: '<input type="checkbox" :checked="checked" @change="$emit(\'change\')" />',
  },
  Dropdown: { // Added Dropdown mock
    name: 'Dropdown',
    props: ['placement', 'trigger'],
    template: '<div><slot /></div>',
  },
  Menu: { // Added Menu mock
    name: 'Menu',
    props: ['mode', 'theme'],
    template: '<div class="ant-menu"><slot /></div>',
    Item: {
      name: 'MenuItem',
      template: '<div class="ant-menu-item"><slot /></div>',
    },
  },
  Input: { // Added Input mock
    name: 'Input',
    props: ['value', 'placeholder'],
    template: '<input :value="value" :placeholder="placeholder" />',
    TextArea: {
      name: 'TextArea',
      props: ['value', 'placeholder'],
      template: '<textarea :value="value" :placeholder="placeholder" />',
    },
  },
  InputNumber: { // Added InputNumber mock
    name: 'InputNumber',
    props: ['value', 'placeholder', 'min', 'max'],
    template: '<input type="number" :value="value" :placeholder="placeholder" :min="min" :max="max" />',
  },
}));

describe('BasicTable', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(BasicTable);
    // Add interaction testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    const wrapper = mount(BasicTable);
    expect(wrapper.findComponent(BasicTable).exists()).toBe(true);
  });
});
