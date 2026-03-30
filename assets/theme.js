const NetDocTheme = {
    version: '1.0.0',

    base: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        monoFont: "'JetBrains Mono', 'Fira Code', monospace",
        borderRadius: { sm: 4, md: 8, lg: 12, xl: 16 },
        transition: 'all 0.3s ease'
    },

    colors: {
        bg: {
            primary: '#0a0e1a',
            secondary: '#111827',
            card: 'rgba(31, 41, 55, 0.85)',
            hover: 'rgba(59, 130, 246, 0.1)'
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
            tertiary: '#64748b'
        },
        accent: {
            blue: '#3b82f6',
            green: '#10b981',
            purple: '#8b5cf6',
            orange: '#f59e0b',
            red: '#ef4444',
            cyan: '#06b6d4'
        }
    },

    devices: {
        router: {
            radius: 35,
            fontSize: 16,
            fontWeight: 700,
            borderWidth: 3
        },
        pc: {
            radius: 22,
            fontSize: 11,
            fontWeight: 600,
            borderWidth: 2
        },
        rr: {
            radius: 38,
            fontSize: 16,
            fontWeight: 700,
            borderWidth: 4
        },
        border: {
            radius: 32,
            fontSize: 14,
            fontWeight: 600,
            borderWidth: 2
        }
    },

    as: {
        100: {
            label: 'AS100',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.08)',
            borderColor: 'rgba(59, 130, 246, 0.4)'
        },
        200: {
            label: 'AS200',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.08)',
            borderColor: 'rgba(16, 185, 129, 0.4)'
        },
        300: {
            label: 'AS300',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.08)',
            borderColor: 'rgba(139, 92, 246, 0.4)'
        }
    },

    deviceColors: {
        default: '#3b82f6',
        rr: '#1e40af',
        client: '#3b82f6',
        border: '#9ca3af',
        host: '#ef4444',
        dr: '#3b82f6',
        bdr: '#8b5cf6',
        drother: '#10b981'
    },

    connection: {
        ibgp: {
            color: '#8b5cf6',
            dashed: true,
            lineWidth: 2
        },
        ebgp: {
            color: '#f59e0b',
            dashed: false,
            lineWidth: 3
        },
        ospf: {
            color: '#10b981',
            dashed: false,
            lineWidth: 2
        },
        direct: {
            color: '#64748b',
            dashed: false,
            lineWidth: 2
        }
    },

    packet: {
        hello: { color: '#22c55e', radius: 6 },
        dbd: { color: '#3b82f6', radius: 7 },
        lsr: { color: '#f59e0b', radius: 6 },
        lsu: { color: '#10b981', radius: 8 },
        lsack: { color: '#8b5cf6', radius: 6 },
        bgp: { color: '#3b82f6', radius: 7 },
        ibgp: { color: '#8b5cf6', radius: 7 },
        ebgp: { color: '#f59e0b', radius: 7 },
        redistribute: { color: '#f97316', radius: 7 },
        drop: { color: '#ef4444', radius: 8 }
    },

    ospf: {
        states: {
            down: { bg: 'rgba(100, 116, 139, 0.5)', color: '#94a3b8', label: 'Down' },
            init: { bg: 'rgba(59, 130, 246, 0.5)', color: '#3b82f6', label: 'Init' },
            '2way': { bg: 'rgba(139, 92, 246, 0.5)', color: '#8b5cf6', label: '2-Way' },
            exstart: { bg: 'rgba(168, 85, 247, 0.5)', color: '#a855f7', label: 'ExStart' },
            exchange: { bg: 'rgba(192, 132, 252, 0.5)', color: '#c084fc', label: 'Exchange' },
            loading: { bg: 'rgba(16, 185, 129, 0.5)', color: '#10b981', label: 'Loading' },
            full: { bg: 'rgba(34, 197, 94, 0.5)', color: '#22c55e', label: 'Full' }
        },
        roles: {
            DR: { color: '#3b82f6', label: 'DR' },
            BDR: { color: '#8b5cf6', label: 'BDR' },
            DROther: { color: '#10b981', label: 'DROther' }
        }
    },

    ui: {
        header: {
            height: 70,
            brandFontSize: 26,
            brandFontWeight: 800
        },
        card: {
            padding: 28,
            borderRadius: 16
        },
        timeline: {
            itemHeight: 60,
            activeColor: '#3b82f6',
            completedColor: '#10b981'
        },
        routeTable: {
            headerBg: 'rgba(59, 130, 246, 0.1)',
            rowHover: 'rgba(255, 255, 255, 0.02)',
            bestRouteBg: 'rgba(249, 115, 22, 0.15)'
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NetDocTheme;
} else if (typeof window !== 'undefined') {
    window.NetDocTheme = NetDocTheme;
}