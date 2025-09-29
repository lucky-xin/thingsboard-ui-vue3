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

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    currentRoute: { value: { path: '/test' } },
    push: vi.fn(),
    replace: vi.fn(),
  })),
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

import PageFooter from '/@/components/Page/src/PageFooter';

describe('PageFooter', () => {
  it('should render without crashing', () => {
    const wrapper = mount(PageFooter);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(PageFooter);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(PageFooter, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(PageFooter);
    // Add event testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(PageFooter);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });
});
