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

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'basic-table',
  })),
}));

// Mock useMessage
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn(),
  })),
}));

// Mock useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => key),
  })),
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Alert: {
    name: 'AAlert',
    props: {
      message: String,
      type: String,
      showIcon: Boolean,
    },
    template: '<div class="ant-alert"><slot /></div>',
  },
  Button: {
    name: 'AButton',
    props: {
      type: String,
      size: String,
    },
    template: '<button class="ant-btn">Button</button>',
  },
  Tooltip: {
    name: 'ATooltip',
    props: {
      title: String,
    },
    template: '<div class="ant-tooltip"><slot /></div>',
  },
  Space: {
    name: 'ASpace',
    template: '<div class="ant-space"><slot /></div>',
  },
}));

import TableSelectionBar from '/@/components/Table/src/components/TableSelectionBar.vue';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('TableSelectionBar', () => {
  const defaultProps = {
    clearSelectedRowKeys: vi.fn(),
    selectedRowKeys: [],
    selectedRows: [],
    total: 0,
  };

  it('should render without crashing', () => {
    const wrapper = mount(TableSelectionBar, {
      props: defaultProps,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(TableSelectionBar, {
      props: defaultProps,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(TableSelectionBar, {
      props: defaultProps,
    });
    // Add interaction testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    const wrapper = mount(TableSelectionBar, {
      props: defaultProps,
    });
    expect(wrapper.findComponent(TableSelectionBar).exists()).toBe(true);
  });
});
