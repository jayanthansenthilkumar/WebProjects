class CosmicNebula {
    constructor() {
        if (!document.body) {
            throw new Error('Document body not found');
        }
        console.log('Creating cosmic nebula effect...');
        this.createCanvas();
        this.initializeEffects();
        this.animate();
        console.log('Cosmic nebula effect created');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'cosmic-nebula-canvas';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeEffects() {
        // Increased from 50 to 150 particles
        this.cosmicdust = Array(150).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 0.5, // More size variety
            speed: Math.random() * 0.8 + 0.2, // More speed variety
            color: this.getRandomParticleColor(),
            angle: Math.random() * Math.PI * 2,
            pulse: Math.random() * 0.02 + 0.01 // Added pulsing effect
        }));

        // Increased from 3 to 5 nebula clouds
        this.nebulaClouds = Array(5).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 300 + 150, // Larger size range
            hue: Math.random() * 60 + 220,
            drift: Math.random() * 0.02 - 0.01,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.1 + 0.05 // Added varying opacity
        }));
    }

    getRandomParticleColor() {
        const colors = [
            `hsla(${Math.random() * 60 + 220}, 80%, 50%, 0.3)`,  // Blue
            `hsla(${Math.random() * 30 + 270}, 70%, 60%, 0.3)`,  // Purple
            `hsla(${Math.random() * 20 + 180}, 85%, 45%, 0.3)`,  // Cyan
            `hsla(${Math.random() * 30 + 290}, 75%, 55%, 0.3)`   // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawNebulaClouds() {
        this.nebulaClouds.forEach(cloud => {
            cloud.angle += cloud.drift;
            const x = cloud.x + Math.cos(cloud.angle) * 20;
            const y = cloud.y + Math.sin(cloud.angle) * 20;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, cloud.size);
            gradient.addColorStop(0, `hsla(${cloud.hue}, 80%, 50%, ${cloud.opacity})`);
            gradient.addColorStop(0.5, `hsla(${cloud.hue + 30}, 70%, 40%, ${cloud.opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, cloud.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawCosmicDust() {
        this.cosmicdust.forEach(particle => {
            particle.y += particle.speed;
            particle.angle += 0.02;
            particle.size += Math.sin(particle.angle) * particle.pulse;

            if (particle.y > this.canvas.height) {
                particle.y = 0;
                particle.x = Math.random() * this.canvas.width;
            }

            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(
                particle.x + Math.sin(particle.angle) * 2,
                particle.y,
                Math.max(0.5, particle.size),
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawNebulaClouds();
        this.drawCosmicDust();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the cosmic nebula when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.cosmicNebula = new CosmicNebula();
        console.log('Cosmic nebula initialized successfully');
    } catch (error) {
        console.error('Failed to initialize cosmic nebula:', error);
    }
});
