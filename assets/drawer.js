class NetworkDrawer {
    constructor(canvas, theme = window.NetDocTheme) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.theme = theme;
        this.time = 0;
    }

    setTime(time) {
        this.time = time;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    drawRouter(device, options = {}) {
        const ctx = this.ctx;
        const theme = this.theme;
        const pulse = Math.sin(this.time * 2) * 5 + (device.pulse || 0) * 12;
        device.pulse = device.pulse ? device.pulse * 0.9 : 0;

        const color = device.color || theme.deviceColors.default;
        const radius = options.radius || theme.devices.router.radius;
        const hasRoutes = device.routes && device.routes.length > 0;

        for (let i = 3; i >= 1; i--) {
            const glow = ctx.createRadialGradient(device.x, device.y, radius - 10, device.x, device.y, radius + 20 + pulse + i * 10);
            glow.addColorStop(0, color + `${Math.floor(30 / i).toString(16).padStart(2, '0')}`);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(device.x, device.y, radius + 20 + pulse + i * 10, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = device.role === 'RR' ? 4 : 3;
        ctx.beginPath();
        ctx.arc(device.x, device.y, radius - 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = color + '30';
        ctx.beginPath();
        ctx.arc(device.x, device.y, radius - 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = `bold ${theme.devices.router.fontSize}px ${theme.base.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(device.name, device.x, device.y + 5);

        if (device.role) {
            ctx.fillStyle = color;
            ctx.font = `600 10px ${theme.base.monoFont}`;
            ctx.fillText(device.role, device.x, device.y + radius + 18);
        }

        if (hasRoutes) {
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.arc(device.x + radius - 5, device.y - radius + 5, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawPC(device, options = {}) {
        const ctx = this.ctx;
        const theme = this.theme;
        const color = device.color || theme.deviceColors.host;
        const pulse = Math.sin(this.time * 2) * 4 + (device.pulse || 0) * 10;
        device.pulse = device.pulse ? device.pulse * 0.9 : 0;

        ctx.fillStyle = color + 'cc';
        ctx.beginPath();
        ctx.roundRect(device.x - 35, device.y - 25, 70, 45, 6);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(device.x - 30, device.y - 20, 60, 35, 4);
        ctx.fill();

        const pingStatus = device.pingSuccess !== undefined ? device.pingSuccess : false;
        ctx.fillStyle = pingStatus ? '#22c55e' : '#ef4444';
        ctx.font = `bold 14px ${theme.base.monoFont}`;
        ctx.textAlign = 'left';
        ctx.fillText(pingStatus ? 'ping OK' : 'ping...', device.x - 28, device.y - 5);

        ctx.fillStyle = color + 'aa';
        ctx.beginPath();
        ctx.rect(device.x - 12, device.y + 20, 24, 8);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = `bold 20px ${theme.base.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(device.name, device.x, device.y + 50);
    }

    drawASArea(x, y, width, height, asNumber, color) {
        const ctx = this.ctx;
        const theme = this.theme;
        const pulse = Math.sin(this.time * 1) * 2;

        const asConfig = theme.as[asNumber] || theme.as[100];

        ctx.strokeStyle = color + '40';
        ctx.lineWidth = 3;
        ctx.setLineDash([12, 6]);
        ctx.lineDashOffset = -this.time * 5;
        ctx.beginPath();
        ctx.roundRect(x - width / 2 - pulse / 2, y - height / 2 - pulse / 2, width + pulse, height + pulse, 25);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = color + '20';
        ctx.beginPath();
        ctx.roundRect(x - width / 2, y - height / 2 - 35, 80, 30, 8);
        ctx.fill();

        ctx.fillStyle = color + '90';
        ctx.font = `bold 16px ${theme.base.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(asConfig.label, x - width / 2 + 40, y - height / 2 - 15);
    }

    drawConnection(from, to, type = 'direct', options = {}) {
        const ctx = this.ctx;
        const theme = this.theme;

        const connConfig = theme.connection[type] || theme.connection.direct;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        if (connConfig.dashed) {
            ctx.setLineDash([8, 4]);
        } else {
            ctx.setLineDash([]);
        }

        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, connConfig.color);
        gradient.addColorStop(1, connConfig.color + '80');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = connConfig.lineWidth;
        ctx.stroke();
        ctx.setLineDash([]);
    }

    drawPacket(from, to, type = 'bgp', options = {}) {
        const ctx = this.ctx;
        const theme = this.theme;

        const packetConfig = theme.packet[type] || theme.packet.bgp;
        const progress = options.progress || 0;

        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;

        ctx.beginPath();
        ctx.arc(x, y, packetConfig.radius, 0, Math.PI * 2);
        ctx.fillStyle = packetConfig.color;
        ctx.fill();

        if (options.glow) {
            ctx.beginPath();
            ctx.arc(x, y, packetConfig.radius + 4, 0, Math.PI * 2);
            ctx.fillStyle = packetConfig.color + '40';
            ctx.fill();
        }
    }

    drawOSPFState(device, state) {
        const ctx = this.ctx;
        const theme = this.theme;
        const stateConfig = theme.ospf.states[state] || theme.ospf.states.down;

        ctx.fillStyle = stateConfig.bg;
        ctx.beginPath();
        ctx.roundRect(device.x + 25, device.y - 12, 60, 22, 4);
        ctx.fill();

        ctx.fillStyle = stateConfig.color;
        ctx.font = `600 11px ${theme.base.monoFont}`;
        ctx.textAlign = 'left';
        ctx.fillText(stateConfig.label, device.x + 30, device.y + 4);
    }

    drawOSPFNeighborLine(from, to, state) {
        const ctx = this.ctx;
        const theme = this.theme;
        const stateConfig = theme.ospf.states[state] || theme.ospf.states.down;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = stateConfig.color + '60';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NetworkDrawer;
} else if (typeof window !== 'undefined') {
    window.NetworkDrawer = NetworkDrawer;
}