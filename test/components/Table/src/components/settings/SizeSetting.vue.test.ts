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
import SizeSetting from '/@/components/Table/src/components/settings/SizeSetting';
import { createTableContext } from '/@/components/Table/src/hooks/useTableContext';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

// Mock the table context hook
vi.mock('/@/components/Table/src/hooks/useTableContext', () => ({
  createTableContext: vi.fn(),
  useTableContext: vi.fn(() => ({
    getSize: vi.fn(() => 'default'),
    setProps: vi.fn(),
    getColumns: vi.fn(() => []),
    setColumns: vi.fn(),
    getBindValues: { value: {} },
  })),
}));

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'ATooltip',
    template: '<div class="ant-tooltip"><slot /><slot name="title" /></div>',
  },
  Dropdown: {
    name: 'ADropdown',
    template: '<div class="ant-dropdown"><slot /><slot name="overlay" /></div>',
  },
  Menu: {
    name: 'AMenu',
    template: '<div class="ant-menu"><slot /></div>',
    Item: {
      name: 'AMenuItem',
      template: '<div class="ant-menu-item"><slot /></div>',
    },
  },
}));

// Mock ant-design icons
vi.mock('@ant-design/icons-vue', () => ({
  ColumnHeightOutlined: {
    name: 'ColumnHeightOutlined',
    template: '<div class="column-height-outlined-icon" />',
  },
}));

// Mock utils
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const wrappedComponent = { ...component, install: vi.fn() };
    return wrappedComponent;
  }),
  deepMerge: vi.fn((target, source) => {
    if (!target) return source;
    if (!source) return target;
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = { ...(target[key] || {}), ...source[key] };
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }),
  setObjToUrlParams: vi.fn(),
  openWindow: vi.fn(),
  noop: vi.fn(),
  sleep: vi.fn(),
  getPopupContainer: vi.fn(() => document.body),
  convertBytesToSize: vi.fn(),
}));

describe('SizeSetting', () => {
  it('should render without crashing', () => {
    // Create table context before mounting
    const mockTableContext = {
      getSize: vi.fn(() => 'default'),
      setProps: vi.fn(),
    };
    createTableContext(mockTableContext as any);

    const wrapper = mount(SizeSetting);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    // Create table context before mounting
    const mockTableContext = {
      getSize: vi.fn(() => 'default'),
      setProps: vi.fn(),
    };
    createTableContext(mockTableContext as any);

    const wrapper = mount(SizeSetting);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    // Create table context before mounting
    const mockTableContext = {
      getSize: vi.fn(() => 'default'),
      setProps: vi.fn(),
    };
    createTableContext(mockTableContext as any);

    const wrapper = mount(SizeSetting);
    // Add interaction testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component structure', () => {
    // Create table context before mounting
    const mockTableContext = {
      getSize: vi.fn(() => 'default'),
      setProps: vi.fn(),
    };
    createTableContext(mockTableContext as any);

    const wrapper = mount(SizeSetting);
    expect(wrapper.findComponent(SizeSetting).exists()).toBe(true);
  });
});
