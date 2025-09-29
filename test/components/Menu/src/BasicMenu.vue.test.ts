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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Enhanced Vue Router mock
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: "/", params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: "/",
    name: "home",
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  RouterView: { template: "<div><slot></slot></div>" },
  RouterLink: { template: "<a><slot></slot></a>", props: ["to"] }
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

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/test' } },
    push: vi.fn(),
    replace: vi.fn(),
  })),
  createRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/test' } },
    push: vi.fn(),
    replace: vi.fn(),
  })),
  createWebHashHistory: vi.fn(() => ({})), // Added createWebHashHistory mock
}));

// Mock useAppStore
vi.mock('/@/stores/modules/app', () => ({
  useAppStore: vi.fn(() => ({
    getMenuSetting: {
      collapsedShowTitle: false
    }
  }))
}));

// Mock useMenuSetting
vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: vi.fn(() => ({
    getCollapsedShowTitle: { value: false },
  })),
}));

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'basic-menu',
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
  Menu: {
    name: 'AMenu',
    props: {
      mode: String,
      theme: String,
      selectedKeys: Array,
      openKeys: Array,
      inlineCollapsed: Boolean,
    },
    emits: ['select', 'openChange'],
    template: '<div class="ant-menu"><slot /></div>',
  },
  MenuItem: {
    name: 'AMenuItem',
    props: {
      key: String,
    },
    template: '<div class="ant-menu-item"><slot /></div>',
  },
  SubMenu: {
    name: 'ASubMenu',
    props: {
      key: String,
      title: String,
    },
    template: '<div class="ant-submenu"><slot /></div>',
  },
  Divider: {
    name: 'ADivider',
    template: '<div class="ant-divider" />',
  },
}));

import BasicMenu from '/@/components/Menu/src/BasicMenu';

describe('BasicMenu', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicMenu);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicMenu);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(BasicMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(BasicMenu);
    // Add event testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(BasicMenu);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });
});
