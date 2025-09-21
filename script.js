// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Simple and reliable navigation function
function scrollToSection(sectionId) {
    console.log('=== NAVIGATION DEBUG ===');
    console.log('Attempting to scroll to:', sectionId);
    
    const target = document.querySelector(sectionId);
    console.log('Target element found:', target);
    
    if (target) {
        console.log('Target element details:', {
            id: target.id,
            className: target.className,
            offsetTop: target.offsetTop,
            tagName: target.tagName
        });
        
        // Get navbar height
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 90;
        console.log('Navbar height:', navbarHeight);
        
        // Calculate position
        const targetPosition = target.offsetTop - navbarHeight - 30;
        console.log('Calculated scroll position:', targetPosition);
        
        // Scroll to position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log('Scroll command executed');
        
        // Add highlight effect
        target.style.transition = 'box-shadow 0.3s ease';
        target.style.boxShadow = '0 0 0 3px rgba(28, 124, 130, 0.3)';
        setTimeout(() => {
            target.style.boxShadow = 'none';
        }, 2000);
        
        return true;
    } else {
        console.error('❌ Section not found:', sectionId);
        console.log('Available sections:');
        const allSections = document.querySelectorAll('section[id]');
        allSections.forEach(section => {
            console.log('- #' + section.id);
        });
        alert('Section not found: ' + sectionId + '\n\nCheck console for available sections.');
        return false;
    }
}

// Add click handlers to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up navigation...');
    
    // Test all sections first
    const sections = ['#home', '#about', '#services', '#products', '#contact'];
    sections.forEach(sectionId => {
        const element = document.querySelector(sectionId);
        if (element) {
            console.log('✅ Found section:', sectionId);
        } else {
            console.error('❌ Missing section:', sectionId);
        }
    });
    
    // Add click handlers to navbar links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            console.log('Nav link clicked:', href);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Scroll to section
            scrollToSection(href);
        });
    });
    
    // Also add handlers to any other anchor links
    const allAnchors = document.querySelectorAll('a[href^="#"]');
    console.log('Found anchor links:', allAnchors.length);
    
    allAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            console.log('Anchor clicked:', href);
            scrollToSection(href);
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .framework-item, .contact-item, .product-showcase, .diff-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const company = contactForm.querySelector('input[placeholder="Company Name"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.video-background video');
    
    if (hero && video) {
        const rate = scrolled * -0.5;
        video.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.product-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6B6B, #1C7C82);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// MediFlow AI Demo Function
function optimizeMediFlow() {
    const department = document.getElementById('department').value;
    const shift = document.getElementById('shift').value;
    const output = document.getElementById('mediflowOutput');
    const button = document.querySelector('.mediflow-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Live Operations...';
    button.disabled = true;
    
    setTimeout(() => {
        // Generate unique healthcare data based on department
        let liveData = {};
        if (department.includes('Emergency')) {
            liveData = {
                currentPatients: 47,
                avgWaitTime: '12 minutes',
                bedOccupancy: '94%',
                criticalCases: 8,
                staffOnDuty: 23,
                equipmentStatus: 'All systems operational',
                recommendations: [
                    'Deploy 2 additional nurses for peak hours',
                    'Activate surge capacity protocol',
                    'Prioritize trauma cases in triage',
                    'Coordinate with OR for emergency surgeries'
                ]
            };
        } else if (department.includes('Operating')) {
            liveData = {
                currentPatients: 12,
                avgWaitTime: '8 minutes',
                bedOccupancy: '87%',
                criticalCases: 3,
                staffOnDuty: 18,
                equipmentStatus: 'All systems operational',
                recommendations: [
                    'Optimize surgery scheduling for efficiency',
                    'Pre-sterilize instruments for next procedures',
                    'Coordinate anesthesia team availability',
                    'Monitor post-op recovery protocols'
                ]
            };
        } else if (department.includes('Intensive Care')) {
            liveData = {
                currentPatients: 24,
                avgWaitTime: '4 minutes',
                bedOccupancy: '96%',
                criticalCases: 15,
                staffOnDuty: 31,
                equipmentStatus: 'All systems operational',
                recommendations: [
                    'Increase monitoring frequency for critical patients',
                    'Optimize ventilator management protocols',
                    'Coordinate with specialists for complex cases',
                    'Implement predictive analytics for patient deterioration'
                ]
            };
        } else if (department.includes('Cardiology')) {
            liveData = {
                currentPatients: 35,
                avgWaitTime: '15 minutes',
                bedOccupancy: '89%',
                criticalCases: 6,
                staffOnDuty: 27,
                equipmentStatus: 'All systems operational',
                recommendations: [
                    'Prioritize cardiac monitoring for high-risk patients',
                    'Optimize catheterization lab scheduling',
                    'Coordinate with cardiothoracic surgery team',
                    'Implement early warning systems for cardiac events'
                ]
            };
        } else if (department.includes('Pediatric')) {
            liveData = {
                currentPatients: 28,
                avgWaitTime: '10 minutes',
                bedOccupancy: '82%',
                criticalCases: 4,
                staffOnDuty: 19,
                equipmentStatus: 'All systems operational',
                recommendations: [
                    'Implement child-friendly care protocols',
                    'Optimize family visitation schedules',
                    'Coordinate with pediatric specialists',
                    'Monitor growth and development metrics'
                ]
            };
        }
        
        output.innerHTML = `
            <div class="mediflow-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #0f4c75, #3282b8);">
                        <i class="fas fa-hospital"></i>
                    </div>
                    <h4 class="result-title">🏥 Live Healthcare Operations Analysis</h4>
                </div>
                
                <div class="operations-overview">
                    <h5>📊 Real-Time Department Status</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Department:</span>
                            <span class="overview-value">${department}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Time Period:</span>
                            <span class="overview-value">${shift}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Status:</span>
                            <span class="overview-value">Live Monitoring</span>
                        </div>
                    </div>
                </div>
                
                <div class="operations-metrics">
                    <h5>📈 Live Performance Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">👥</div>
                            <div class="metric-details">
                                <div class="metric-value">${liveData.currentPatients}</div>
                                <div class="metric-label">Current Patients</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">⏰</div>
                            <div class="metric-details">
                                <div class="metric-value">${liveData.avgWaitTime}</div>
                                <div class="metric-label">Avg Wait Time</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🏥</div>
                            <div class="metric-details">
                                <div class="metric-value">${liveData.bedOccupancy}</div>
                                <div class="metric-label">Bed Occupancy</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🚨</div>
                            <div class="metric-details">
                                <div class="metric-value">${liveData.criticalCases}</div>
                                <div class="metric-label">Critical Cases</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="optimization-recommendations">
                    <h5>🎯 AI-Generated Recommendations</h5>
                    ${liveData.recommendations.map(rec => `
                        <div class="recommendation-item">
                            <span class="recommendation-icon">💡</span>
                            <span class="recommendation-text">${rec}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-heartbeat"></i> Analyze Live Operations';
        button.disabled = false;
    }, 2500);
}

// RetailGenius AI Demo Function
function analyzeRetailGenius() {
    const storeType = document.getElementById('storeType').value;
    const analysisPeriod = document.getElementById('analysisPeriod').value;
    const output = document.getElementById('retailgeniusOutput');
    const button = document.querySelector('.retailgenius-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Retail Intelligence...';
    button.disabled = true;
    
    setTimeout(() => {
        // Generate unique retail data based on store type
        let retailData = {};
        if (storeType.includes('Fashion')) {
            retailData = {
                customerTraffic: '2,847 daily visitors',
                avgBasketValue: '$127.50',
                conversionRate: '23.4%',
                topSellingCategory: 'Women\'s Apparel',
                peakHours: '2:00 PM - 6:00 PM',
                customerDemographics: '65% Female, 35% Male',
                recommendations: [
                    'Implement dynamic pricing for seasonal items',
                    'Optimize visual merchandising for high-traffic areas',
                    'Launch targeted email campaigns for repeat customers',
                    'Expand size range for best-selling categories'
                ]
            };
        } else if (storeType.includes('Electronics')) {
            retailData = {
                customerTraffic: '1,923 daily visitors',
                avgBasketValue: '$456.80',
                conversionRate: '18.7%',
                topSellingCategory: 'Smartphones & Accessories',
                peakHours: '7:00 PM - 9:00 PM',
                customerDemographics: '58% Male, 42% Female',
                recommendations: [
                    'Bundle complementary products for higher AOV',
                    'Implement tech support services for complex products',
                    'Create interactive product demonstrations',
                    'Optimize inventory for trending tech items'
                ]
            };
        } else if (storeType.includes('Grocery')) {
            retailData = {
                customerTraffic: '4,562 daily visitors',
                avgBasketValue: '$89.30',
                conversionRate: '94.2%',
                topSellingCategory: 'Fresh Produce',
                peakHours: '5:00 PM - 7:00 PM',
                customerDemographics: '52% Female, 48% Male',
                recommendations: [
                    'Implement smart shelf management for perishables',
                    'Optimize checkout lanes during peak hours',
                    'Launch loyalty program for frequent shoppers',
                    'Expand organic and healthy food sections'
                ]
            };
        } else if (storeType.includes('Home & Garden')) {
            retailData = {
                customerTraffic: '1,456 daily visitors',
                avgBasketValue: '$234.60',
                conversionRate: '31.2%',
                topSellingCategory: 'Outdoor Furniture',
                peakHours: '10:00 AM - 2:00 PM',
                customerDemographics: '48% Female, 52% Male',
                recommendations: [
                    'Create seasonal display areas for trending items',
                    'Implement project-based product bundling',
                    'Launch DIY workshop events',
                    'Optimize inventory for seasonal demand patterns'
                ]
            };
        } else if (storeType.includes('Beauty & Health')) {
            retailData = {
                customerTraffic: '1,789 daily visitors',
                avgBasketValue: '$78.90',
                conversionRate: '42.1%',
                topSellingCategory: 'Skincare Products',
                peakHours: '12:00 PM - 4:00 PM',
                customerDemographics: '78% Female, 22% Male',
                recommendations: [
                    'Implement personalized beauty consultations',
                    'Create sampling stations for new products',
                    'Launch subscription boxes for loyal customers',
                    'Optimize product placement for impulse purchases'
                ]
            };
        }
        
        output.innerHTML = `
            <div class="retailgenius-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #38a169, #68d391);">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h4 class="result-title">🛍️ Advanced Retail Intelligence Report</h4>
                </div>
                
                <div class="retail-overview">
                    <h5>📊 Store Performance Overview</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Retail Chain:</span>
                            <span class="overview-value">${storeType}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Analytics Scope:</span>
                            <span class="overview-value">${analysisPeriod}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Status:</span>
                            <span class="overview-value">Intelligence Generated</span>
                        </div>
                    </div>
                </div>
                
                <div class="retail-metrics">
                    <h5>📈 Live Retail Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">👥</div>
                            <div class="metric-details">
                                <div class="metric-value">${retailData.customerTraffic}</div>
                                <div class="metric-label">Daily Traffic</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">💰</div>
                            <div class="metric-details">
                                <div class="metric-value">${retailData.avgBasketValue}</div>
                                <div class="metric-label">Avg Basket Value</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">📊</div>
                            <div class="metric-details">
                                <div class="metric-value">${retailData.conversionRate}</div>
                                <div class="metric-label">Conversion Rate</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🏆</div>
                            <div class="metric-details">
                                <div class="metric-value">${retailData.topSellingCategory}</div>
                                <div class="metric-label">Top Category</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="retail-insights">
                    <h5>🎯 AI-Generated Retail Insights</h5>
                    <div class="insight-item">
                        <span class="insight-icon">⏰</span>
                        <span class="insight-text">Peak shopping hours: ${retailData.peakHours}</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">👤</span>
                        <span class="insight-text">Customer demographics: ${retailData.customerDemographics}</span>
                    </div>
                    ${retailData.recommendations.map(rec => `
                        <div class="insight-item">
                            <span class="insight-icon">💡</span>
                            <span class="insight-text">${rec}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-chart-line"></i> Generate Retail Intelligence';
        button.disabled = false;
    }, 2500);
}

// HealthPulse AI Demo Function
function analyzeHealthPulse() {
    const patientAge = document.getElementById('patientAge').value;
    const healthCondition = document.getElementById('healthCondition').value;
    const output = document.getElementById('healthpulseOutput');
    const button = document.querySelector('.healthpulse-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Health Data...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="healthpulse-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #e53e3e, #fc8181);">
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <h4 class="result-title">Health Analysis Complete</h4>
                </div>
                
                <div class="health-overview">
                    <h5>Health Overview</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Patient Age:</span>
                            <span class="overview-value">${patientAge}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Health Condition:</span>
                            <span class="overview-value">${healthCondition}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Status:</span>
                            <span class="overview-value">Analyzed</span>
                        </div>
                    </div>
                </div>
                
                <div class="health-metrics">
                    <h5>Health Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">❤️</div>
                            <div class="metric-details">
                                <div class="metric-value">72</div>
                                <div class="metric-label">Heart Rate (BPM)</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🩸</div>
                            <div class="metric-details">
                                <div class="metric-value">120/80</div>
                                <div class="metric-label">Blood Pressure</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🌡️</div>
                            <div class="metric-details">
                                <div class="metric-value">98.6°F</div>
                                <div class="metric-label">Body Temperature</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🫁</div>
                            <div class="metric-details">
                                <div class="metric-value">95%</div>
                                <div class="metric-label">Oxygen Saturation</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="health-insights">
                    <h5>Health Insights & Recommendations</h5>
                    <div class="insight-item">
                        <span class="insight-icon">💊</span>
                        <span class="insight-text">Regular medication adherence recommended for ${healthCondition}</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🏃‍♂️</span>
                        <span class="insight-text">Daily exercise routine suggested for age group ${patientAge}</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🥗</span>
                        <span class="insight-text">Balanced diet with specific nutrients for optimal health</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">⏰</span>
                        <span class="insight-text">Regular health checkups every 6 months recommended</span>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-heartbeat"></i> Analyze Health Data';
        button.disabled = false;
    }, 2500);
}

// StoreOptimizer AI Demo Function
function optimizeStoreLayout() {
    const storeType = document.getElementById('storeType').value;
    const storeSize = document.getElementById('storeSize').value;
    const output = document.getElementById('storeoptimizerOutput');
    const button = document.querySelector('.storeoptimizer-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimizing Store Layout...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="storeoptimizer-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #805ad5, #b794f6);">
                        <i class="fas fa-store"></i>
                    </div>
                    <h4 class="result-title">Store Layout Optimization Complete</h4>
                </div>
                
                <div class="store-overview">
                    <h5>Store Overview</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Store Type:</span>
                            <span class="overview-value">${storeType}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Store Size:</span>
                            <span class="overview-value">${storeSize}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Status:</span>
                            <span class="overview-value">Optimized</span>
                        </div>
                    </div>
                </div>
                
                <div class="store-metrics">
                    <h5>Optimization Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">📈</div>
                            <div class="metric-details">
                                <div class="metric-value">40%</div>
                                <div class="metric-label">Foot Traffic Increase</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">💰</div>
                            <div class="metric-details">
                                <div class="metric-value">25%</div>
                                <div class="metric-label">Sales Boost</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">⏱️</div>
                            <div class="metric-details">
                                <div class="metric-value">30%</div>
                                <div class="metric-label">Time Efficiency</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">😊</div>
                            <div class="metric-details">
                                <div class="metric-value">50%</div>
                                <div class="metric-label">Customer Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="store-insights">
                    <h5>Layout Optimization Insights</h5>
                    <div class="insight-item">
                        <span class="insight-icon">🏪</span>
                        <span class="insight-text">Optimal product placement for ${storeType} in ${storeSize} space</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🚶‍♂️</span>
                        <span class="insight-text">Customer flow optimization reduces congestion by 40%</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">📦</span>
                        <span class="insight-text">Inventory placement strategy increases visibility by 35%</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🎯</span>
                        <span class="insight-text">Strategic positioning boosts impulse purchases by 25%</span>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-store"></i> Optimize Store Layout';
        button.disabled = false;
    }, 2500);
}

// PatientCare AI Demo Function
function analyzePatientCare() {
    const patientType = document.getElementById('patientType').value;
    const careLevel = document.getElementById('careLevel').value;
    const output = document.getElementById('patientcareOutput');
    const button = document.querySelector('.patientcare-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Patient Care...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="patientcare-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #2c3e50, #34495e);">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <h4 class="result-title">Patient Care Analysis Complete</h4>
                </div>
                
                <div class="patient-overview">
                    <h5>Patient Care Overview</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Patient Type:</span>
                            <span class="overview-value">${patientType}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Care Level:</span>
                            <span class="overview-value">${careLevel}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Status:</span>
                            <span class="overview-value">Analyzed</span>
                        </div>
                    </div>
                </div>
                
                <div class="patient-metrics">
                    <h5>Care Quality Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">⏰</div>
                            <div class="metric-details">
                                <div class="metric-value">85%</div>
                                <div class="metric-label">Response Time</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">💊</div>
                            <div class="metric-details">
                                <div class="metric-value">95%</div>
                                <div class="metric-label">Medication Accuracy</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🏥</div>
                            <div class="metric-details">
                                <div class="metric-value">90%</div>
                                <div class="metric-label">Care Quality</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">😊</div>
                            <div class="metric-details">
                                <div class="metric-value">88%</div>
                                <div class="metric-label">Patient Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="patient-insights">
                    <h5>Patient Care Insights</h5>
                    <div class="insight-item">
                        <span class="insight-icon">👨‍⚕️</span>
                        <span class="insight-text">Specialized care protocols for ${patientType} patients</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">📋</span>
                        <span class="insight-text">${careLevel} care level requires specific monitoring procedures</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🔄</span>
                        <span class="insight-text">Continuous care improvement reduces readmission rates by 30%</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">📊</span>
                        <span class="insight-text">Data-driven care decisions improve patient outcomes by 25%</span>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-user-md"></i> Analyze Patient Care';
        button.disabled = false;
    }, 2500);
}

// StrategyGenius AI Demo Function
function generateBusinessStrategy() {
    const businessType = document.getElementById('businessType').value;
    const companySize = document.getElementById('companySize').value;
    const targetMarket = document.getElementById('targetMarket').value;
    const output = document.getElementById('strategyOutput');
    const button = document.querySelector('.strategy-generate-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Market...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="strategy-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #805ad5, #b794f6);">
                        <i class="fas fa-chess-king"></i>
                    </div>
                    <h4 class="result-title">AI Business Strategy Generated</h4>
                </div>
                
                <div class="strategy-overview">
                    <h5>Strategy Overview</h5>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <span class="overview-label">Business Type:</span>
                            <span class="overview-value">${businessType}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Company Size:</span>
                            <span class="overview-value">${companySize}</span>
                        </div>
                        <div class="overview-item">
                            <span class="overview-label">Target Market:</span>
                            <span class="overview-value">${targetMarket}</span>
                        </div>
                    </div>
                </div>
                
                <div class="strategy-chart">
                    <h5>Market Analysis</h5>
                    <div class="chart-title">Market Opportunity vs Competition</div>
                    <div class="chart-bars">
                        <div class="chart-bar" style="height: 85%;" data-label="Market Opportunity"></div>
                        <div class="chart-bar" style="height: 60%;" data-label="Competition Level"></div>
                        <div class="chart-bar" style="height: 75%;" data-label="Growth Potential"></div>
                        <div class="chart-bar" style="height: 90%;" data-label="Profit Margin"></div>
                    </div>
                    <div class="chart-labels">
                        <span>Market</span>
                        <span>Competition</span>
                        <span>Growth</span>
                        <span>Profit</span>
                    </div>
                </div>
                
                <div class="strategy-recommendations">
                    <h5>Strategic Recommendations</h5>
                    <div class="recommendation-item">
                        <span class="recommendation-icon">🎯</span>
                        <span class="recommendation-text">Focus on ${businessType} market with ${targetMarket} approach</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="recommendation-icon">📈</span>
                        <span class="recommendation-text">Implement AI-powered customer analytics for 35% growth</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="recommendation-icon">🚀</span>
                        <span class="recommendation-text">Scale operations to handle ${companySize} workforce efficiently</span>
                    </div>
                    <div class="recommendation-item">
                        <span class="recommendation-icon">💰</span>
                        <span class="recommendation-text">Optimize pricing strategy for 25% profit margin increase</span>
                    </div>
                </div>
                
                <div class="strategy-metrics">
                    <h5>Projected Results</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">📊</div>
                            <div class="metric-details">
                                <div class="metric-value">300%</div>
                                <div class="metric-label">ROI</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">📈</div>
                            <div class="metric-details">
                                <div class="metric-value">95%</div>
                                <div class="metric-label">Success Rate</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">⏱️</div>
                            <div class="metric-details">
                                <div class="metric-value">6M</div>
                                <div class="metric-label">Implementation</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🎯</div>
                            <div class="metric-details">
                                <div class="metric-value">85%</div>
                                <div class="metric-label">Accuracy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-chess-king"></i> Generate Strategy';
        button.disabled = false;
    }, 3000);
}

// QuantumSync AI Demo Function
function startQuantumSync() {
    const targetDimension = document.getElementById('targetDimension').value;
    const dataType = document.getElementById('dataType').value;
    const output = document.getElementById('quantumOutput');
    const button = document.querySelector('.quantum-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Quantum Entangling...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="quantum-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #8B5CF6, #A855F7);">
                        <i class="fas fa-atom"></i>
                    </div>
                    <h4 class="result-title">Quantum Synchronization Complete</h4>
                </div>
                
                <div class="quantum-status">
                    <h5>Quantum Status</h5>
                    <div class="status-grid">
                        <div class="status-item">
                            <div class="status-indicator quantum-active"></div>
                            <div class="status-info">
                                <div class="status-label">Entanglement Status</div>
                                <div class="status-value">Active</div>
                            </div>
                        </div>
                        <div class="status-item">
                            <div class="status-indicator quantum-sync"></div>
                            <div class="status-info">
                                <div class="status-label">Sync Status</div>
                                <div class="status-value">Complete</div>
                            </div>
                        </div>
                        <div class="status-item">
                            <div class="status-indicator quantum-dimension"></div>
                            <div class="status-info">
                                <div class="status-label">Target Dimension</div>
                                <div class="status-value">${targetDimension}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="quantum-metrics">
                    <h5>Quantum Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">⚛️</div>
                            <div class="metric-details">
                                <div class="metric-value">∞</div>
                                <div class="metric-label">Sync Speed</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🌀</div>
                            <div class="metric-details">
                                <div class="metric-value">11D</div>
                                <div class="metric-label">Dimensions</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">⚡</div>
                            <div class="metric-details">
                                <div class="metric-value">0.0001s</div>
                                <div class="metric-label">Entanglement Time</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">🌌</div>
                            <div class="metric-details">
                                <div class="metric-value">∞</div>
                                <div class="metric-label">Data Capacity</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="quantum-visualization">
                    <h5>Quantum Field Visualization</h5>
                    <div class="quantum-field">
                        <div class="quantum-particle" style="animation-delay: 0s;"></div>
                        <div class="quantum-particle" style="animation-delay: 0.5s;"></div>
                        <div class="quantum-particle" style="animation-delay: 1s;"></div>
                        <div class="quantum-particle" style="animation-delay: 1.5s;"></div>
                        <div class="quantum-particle" style="animation-delay: 2s;"></div>
                    </div>
                </div>
                
                <div class="quantum-insights">
                    <h5>Quantum Insights</h5>
                    <div class="insight-item">
                        <span class="insight-icon">🔮</span>
                        <span>Data successfully entangled across ${targetDimension}</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">⚛️</span>
                        <span>Quantum coherence maintained at 99.99%</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🌌</span>
                        <span>Parallel universe data integration complete</span>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-atom"></i> Initiate Quantum Sync';
        button.disabled = false;
    }, 3000);
}

// DataVortex AI Demo Function
function startDataVortexDemo() {
    const dataStream = document.getElementById('dataStream').value;
    const timeRange = document.getElementById('timeRange').value;
    const output = document.getElementById('datavortexOutput');
    const button = document.querySelector('.datavortex-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Live Data...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="dashboard-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #1e3c72, #2a5298);">
                        <i class="fas fa-chart-area"></i>
                    </div>
                    <h4 class="result-title">Live Analytics Dashboard</h4>
                </div>
                
                <div class="dashboard-metrics">
                    <div class="metric-card">
                        <div class="metric-icon">📊</div>
                        <div class="metric-info">
                            <div class="metric-value">$2.4M</div>
                            <div class="metric-label">Total Revenue</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">👥</div>
                        <div class="metric-info">
                            <div class="metric-value">15.2K</div>
                            <div class="metric-label">Active Users</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">📈</div>
                        <div class="metric-info">
                            <div class="metric-value">+23%</div>
                            <div class="metric-label">Growth Rate</div>
                        </div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-title">Real-time Data Stream: ${dataStream}</div>
                    <div class="live-chart">
                        <div class="chart-line" style="height: 60%;"></div>
                        <div class="chart-line" style="height: 80%;"></div>
                        <div class="chart-line" style="height: 45%;"></div>
                        <div class="chart-line" style="height: 90%;"></div>
                        <div class="chart-line" style="height: 70%;"></div>
                        <div class="chart-line" style="height: 85%;"></div>
                    </div>
                    <div class="chart-labels">
                        <span>00:00</span>
                        <span>04:00</span>
                        <span>08:00</span>
                        <span>12:00</span>
                        <span>16:00</span>
                        <span>20:00</span>
                    </div>
                </div>
                
                <div class="insights-section">
                    <h5>AI Insights</h5>
                    <div class="insight-item">
                        <span class="insight-icon">🔍</span>
                        <span>Peak traffic detected at 2:00 PM with 340% increase</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">⚡</span>
                        <span>Conversion rate improved by 15% in last 4 hours</span>
                    </div>
                    <div class="insight-item">
                        <span class="insight-icon">🎯</span>
                        <span>Recommendation: Scale server capacity for peak hours</span>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-play"></i> Start Live Analytics';
        button.disabled = false;
    }, 2500);
}

// HealthPulse AI Demo Function
function startHealthPulseDemo() {
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const symptoms = Array.from(document.querySelectorAll('.symptom-checkbox input:checked')).map(cb => cb.value);
    const output = document.getElementById('healthpulseOutput');
    const button = document.querySelector('.healthpulse-btn');
    
    if (symptoms.length === 0) {
        alert('Please select at least one symptom');
        return;
    }
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running AI Diagnosis...';
    button.disabled = true;
    
    setTimeout(() => {
        const diagnoses = [
            { 
                name: 'Viral Upper Respiratory Infection', 
                confidence: '87%', 
                severity: 'Mild',
                treatment: 'Rest, hydration, OTC pain relievers',
                followUp: 'Monitor for 3-5 days, seek care if symptoms worsen'
            },
            { 
                name: 'Influenza (Flu)', 
                confidence: '92%', 
                severity: 'Moderate',
                treatment: 'Antiviral medication, rest, fluids',
                followUp: 'Seek medical attention within 48 hours'
            },
            { 
                name: 'Migraine Headache', 
                confidence: '89%', 
                severity: 'Moderate',
                treatment: 'Pain relief, dark room, hydration',
                followUp: 'Track triggers, consider preventive medication'
            }
        ];
        
        const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
        
        output.innerHTML = `
            <div class="diagnosis-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #0f4c75, #3282b8);">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <h4 class="result-title">AI Medical Diagnosis Complete</h4>
                </div>
                
                <div class="patient-summary">
                    <h5>Patient Summary</h5>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <span class="summary-label">Age:</span>
                            <span class="summary-value">${age}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Gender:</span>
                            <span class="summary-value">${gender}</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Symptoms:</span>
                            <span class="summary-value">${symptoms.join(', ')}</span>
                        </div>
                    </div>
                </div>
                
                <div class="diagnosis-details">
                    <h5>AI Diagnosis</h5>
                    <div class="diagnosis-card">
                        <div class="diagnosis-header">
                            <span class="diagnosis-name">${randomDiagnosis.name}</span>
                            <span class="confidence-badge">${randomDiagnosis.confidence}</span>
                        </div>
                        <div class="severity-indicator">
                            <span class="severity-label">Severity:</span>
                            <span class="severity-level ${randomDiagnosis.severity.toLowerCase()}">${randomDiagnosis.severity}</span>
                        </div>
                    </div>
                </div>
                
                <div class="treatment-plan">
                    <h5>Treatment Plan</h5>
                    <div class="treatment-item">
                        <span class="treatment-icon">💊</span>
                        <span class="treatment-text">${randomDiagnosis.treatment}</span>
                    </div>
                    <div class="treatment-item">
                        <span class="treatment-icon">📋</span>
                        <span class="treatment-text">${randomDiagnosis.followUp}</span>
                    </div>
                </div>
                
                <div class="medical-disclaimer">
                    <p><strong>⚠️ Medical Disclaimer:</strong> This is a demonstration. Always consult a healthcare professional for actual medical advice.</p>
                </div>
                
                <div class="result-metrics">
                    <div class="result-metric">
                        <div class="result-metric-value">${randomDiagnosis.confidence}</div>
                        <div class="result-metric-label">Accuracy</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">2.3s</div>
                        <div class="result-metric-label">Response</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">94.2%</div>
                        <div class="result-metric-label">Reliability</div>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-stethoscope"></i> Run AI Diagnosis';
        button.disabled = false;
    }, 3000);
}

// NeuroTask Pro Demo Function
function startNeuroTaskDemo() {
    const trigger = document.getElementById('triggerSelect').value;
    const action = document.getElementById('actionSelect').value;
    const condition = document.getElementById('conditionSelect').value;
    const output = document.getElementById('neurotaskOutput');
    const button = document.querySelector('.neurotask-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying Workflow...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="workflow-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #2c3e50, #34495e);">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <h4 class="result-title">Workflow Deployed Successfully</h4>
                </div>
                
                <div class="workflow-summary">
                    <h5>Workflow Configuration</h5>
                    <div class="workflow-flow">
                        <div class="flow-step">
                            <div class="step-icon">🔔</div>
                            <div class="step-details">
                                <div class="step-title">Trigger</div>
                                <div class="step-value">${trigger}</div>
                            </div>
                        </div>
                        <div class="flow-arrow">→</div>
                        <div class="flow-step">
                            <div class="step-icon">⚡</div>
                            <div class="step-details">
                                <div class="step-title">Action</div>
                                <div class="step-value">${action}</div>
                            </div>
                        </div>
                        <div class="flow-arrow">→</div>
                        <div class="flow-step">
                            <div class="step-icon">🔍</div>
                            <div class="step-details">
                                <div class="step-title">Condition</div>
                                <div class="step-value">${condition}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="automation-status">
                    <h5>Automation Status</h5>
                    <div class="status-grid">
                        <div class="status-item">
                            <div class="status-indicator active"></div>
                            <div class="status-info">
                                <div class="status-label">Workflow Status</div>
                                <div class="status-value">Active</div>
                            </div>
                        </div>
                        <div class="status-item">
                            <div class="status-indicator success"></div>
                            <div class="status-info">
                                <div class="status-label">Last Execution</div>
                                <div class="status-value">2 minutes ago</div>
                            </div>
                        </div>
                        <div class="status-item">
                            <div class="status-indicator processing"></div>
                            <div class="status-info">
                                <div class="status-label">Next Run</div>
                                <div class="status-value">In 5 minutes</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="performance-metrics">
                    <h5>Performance Metrics</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-icon">📊</div>
                            <div class="metric-details">
                                <div class="metric-value">247</div>
                                <div class="metric-label">Tasks Executed</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">⏱️</div>
                            <div class="metric-details">
                                <div class="metric-value">2.3s</div>
                                <div class="metric-label">Avg. Execution Time</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">✅</div>
                            <div class="metric-details">
                                <div class="metric-value">99.9%</div>
                                <div class="metric-label">Success Rate</div>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-icon">💰</div>
                            <div class="metric-details">
                                <div class="metric-value">$1.2K</div>
                                <div class="metric-label">Cost Saved</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="workflow-actions">
                    <button class="action-btn primary">View Logs</button>
                    <button class="action-btn secondary">Edit Workflow</button>
                    <button class="action-btn danger">Stop Workflow</button>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-play"></i> Deploy Workflow';
        button.disabled = false;
    }, 2500);
}

function optimizePatientFlow() {
    const output = document.getElementById('patientFlowOutput');
    const button = document.querySelector('.demo-generate-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimizing...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="demo-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #e53e3e, #fc8181);">
                        <i class="fas fa-route"></i>
                    </div>
                    <h4 class="result-title">Patient Journey Optimized</h4>
                </div>
                <div class="result-content">
                    <p><strong>Patient Type:</strong> Emergency Patient</p>
                    <p><strong>Optimized Path:</strong> Triage → Emergency Room → Treatment → Discharge</p>
                    <p><strong>Wait Time Reduced:</strong> From 45 minutes to 12 minutes</p>
                    <p><strong>Resource Allocation:</strong> 3 doctors, 2 nurses, 1 specialist</p>
                </div>
                <div class="result-metrics">
                    <div class="result-metric">
                        <div class="result-metric-value">73%</div>
                        <div class="result-metric-label">Time Saved</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">85%</div>
                        <div class="result-metric-label">Efficiency</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">12min</div>
                        <div class="result-metric-label">Wait Time</div>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-route"></i> Optimize Journey';
        button.disabled = false;
    }, 2500);
}

function optimizeStoreLayout() {
    const output = document.getElementById('storeLayoutOutput');
    const button = document.querySelector('.demo-generate-btn');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimizing...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="demo-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #38a169, #68d391);">
                        <i class="fas fa-th-large"></i>
                    </div>
                    <h4 class="result-title">Store Layout Optimized</h4>
                </div>
                <div class="result-content">
                    <p><strong>Store Type:</strong> Fashion Retail</p>
                    <p><strong>Optimized Layout:</strong> Entrance → Featured Items → Main Categories → Checkout</p>
                    <p><strong>Customer Flow:</strong> Improved by 25% with better product placement</p>
                    <p><strong>Sales Impact:</strong> 30% increase in average transaction value</p>
                </div>
                <div class="result-metrics">
                    <div class="result-metric">
                        <div class="result-metric-value">30%</div>
                        <div class="result-metric-label">Sales Boost</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">25%</div>
                        <div class="result-metric-label">Traffic</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">18%</div>
                        <div class="result-metric-label">Conversion</div>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-th-large"></i> Optimize Layout';
        button.disabled = false;
    }, 2500);
}

function generateBusinessStrategy() {
    const businessType = document.getElementById('businessType').value;
    const companySize = document.getElementById('companySize').value;
    const targetMarket = document.getElementById('targetMarket').value;
    const output = document.getElementById('strategyOutput');
    const button = document.querySelector('.strategy-generate-btn');
    
    if (!targetMarket.trim()) {
        alert('Please enter target market');
        return;
    }
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Market...';
    button.disabled = true;
    
    setTimeout(() => {
        output.innerHTML = `
            <div class="strategy-result">
                <div class="result-header">
                    <div class="result-icon" style="background: linear-gradient(135deg, #805ad5, #b794f6);">
                        <i class="fas fa-chess-king"></i>
                    </div>
                    <h4 class="result-title">AI Strategy Analysis Complete</h4>
                </div>
                
                <div class="result-content">
                    <p><strong>Business Profile:</strong> ${businessType} | ${companySize} | ${targetMarket}</p>
                    <p><strong>Market Opportunity:</strong> High growth potential in ${targetMarket} sector</p>
                    <p><strong>Competitive Advantage:</strong> AI-driven insights provide 3x faster decision making</p>
                </div>
                
                <div class="strategy-chart">
                    <div class="chart-title">Market Growth Projection</div>
                    <div class="chart-bars">
                        <div class="chart-bar" style="height: 40%;" title="Q1: 15%"></div>
                        <div class="chart-bar" style="height: 60%;" title="Q2: 25%"></div>
                        <div class="chart-bar" style="height: 80%;" title="Q3: 35%"></div>
                        <div class="chart-bar" style="height: 100%;" title="Q4: 45%"></div>
                    </div>
                    <div class="chart-labels">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                    </div>
                </div>
                
                <div class="strategy-recommendations">
                    <h5 style="margin: 0 0 15px 0; color: #2d3748;">Strategic Recommendations</h5>
                    <div class="recommendation-item">
                        <div class="recommendation-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div class="recommendation-text">
                            <strong>Market Expansion:</strong> Target 3 new geographic markets with 40% growth potential
                        </div>
                    </div>
                    <div class="recommendation-item">
                        <div class="recommendation-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="recommendation-text">
                            <strong>Customer Acquisition:</strong> Implement AI-powered lead scoring to increase conversion by 60%
                        </div>
                    </div>
                    <div class="recommendation-item">
                        <div class="recommendation-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="recommendation-text">
                            <strong>Revenue Optimization:</strong> Dynamic pricing strategy can boost margins by 25%
                        </div>
                    </div>
                    <div class="recommendation-item">
                        <div class="recommendation-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <div class="recommendation-text">
                            <strong>Operational Efficiency:</strong> Automate 70% of routine tasks to reduce costs by 30%
                        </div>
                    </div>
                </div>
                
                <div class="result-metrics">
                    <div class="result-metric">
                        <div class="result-metric-value">95%</div>
                        <div class="result-metric-label">Strategy Accuracy</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">3x</div>
                        <div class="result-metric-label">Growth Rate</div>
                    </div>
                    <div class="result-metric">
                        <div class="result-metric-value">$2.5M</div>
                        <div class="result-metric-label">Revenue Impact</div>
                    </div>
                </div>
            </div>
        `;
        output.classList.add('has-content');
        
        // Reset button
        button.innerHTML = '<i class="fas fa-chess-king"></i> Generate Strategy';
        button.disabled = false;
    }, 3000);
}

// Demo Functions for New Products
function getMediFlowDemo() {
    return `
        <div class="mediflow-demo-container">
            <div class="mediflow-demo-header">
                <h4>🏥 Real-Time Healthcare Operations Center</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>Live Operations Monitoring</span>
                </div>
            </div>
            <div class="mediflow-demo-content">
                <div class="mediflow-controls">
                    <div class="control-group">
                        <label>🏥 Hospital Department:</label>
                        <select class="mediflow-select" id="department">
                            <option>Emergency Department</option>
                            <option>Operating Theater</option>
                            <option>Intensive Care Unit</option>
                            <option>Cardiology Ward</option>
                            <option>Pediatric Unit</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>⏰ Time Period:</label>
                        <select class="mediflow-select" id="shift">
                            <option>Current Shift (Live)</option>
                            <option>Last 24 Hours</option>
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <button class="mediflow-btn" onclick="optimizeMediFlow()">
                        <i class="fas fa-heartbeat"></i> Analyze Live Operations
                    </button>
                </div>
                <div class="mediflow-output" id="mediflowOutput">
                    <div class="mediflow-placeholder">
                        <i class="fas fa-hospital"></i>
                        <p>Select department and time period to analyze live healthcare operations</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getRetailGeniusDemo() {
    return `
        <div class="retailgenius-demo-container">
            <div class="retailgenius-demo-header">
                <h4>🛍️ Advanced Retail Analytics & Customer Intelligence</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>Real-Time Analytics Active</span>
                </div>
            </div>
            <div class="retailgenius-demo-content">
                <div class="retailgenius-controls">
                    <div class="control-group">
                        <label>🏪 Retail Chain:</label>
                        <select class="retailgenius-select" id="storeType">
                            <option>Fashion & Apparel Chain</option>
                            <option>Electronics Superstore</option>
                            <option>Grocery & Supermarket</option>
                            <option>Home & Garden Center</option>
                            <option>Beauty & Health Store</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>📊 Analytics Scope:</label>
                        <select class="retailgenius-select" id="analysisPeriod">
                            <option>Live Customer Behavior (Real-time)</option>
                            <option>Sales Performance (Last 7 Days)</option>
                            <option>Inventory Optimization (Last 30 Days)</option>
                            <option>Market Trends (Last Quarter)</option>
                        </select>
                    </div>
                    <button class="retailgenius-btn" onclick="analyzeRetailGenius()">
                        <i class="fas fa-chart-line"></i> Generate Retail Intelligence
                    </button>
                </div>
                <div class="retailgenius-output" id="retailgeniusOutput">
                    <div class="retailgenius-placeholder">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Select retail chain and analytics scope to generate advanced retail intelligence</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getHealthPulseDemo() {
    return `
        <div class="healthpulse-demo-container">
            <div class="healthpulse-demo-header">
                <h4>💓 Advanced Health Monitoring & Predictive Analytics</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>24/7 Health Monitoring Active</span>
                </div>
            </div>
            <div class="healthpulse-demo-content">
                <div class="healthpulse-controls">
                    <div class="control-group">
                        <label>👤 Patient Profile:</label>
                        <select class="healthpulse-select" id="patientAge">
                            <option>Young Adult (18-25)</option>
                            <option>Adult (26-35)</option>
                            <option>Middle Age (36-45)</option>
                            <option>Mature Adult (46-55)</option>
                            <option>Senior (56-65)</option>
                            <option>Elderly (65+)</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>🏥 Health Status:</label>
                        <select class="healthpulse-select" id="healthCondition">
                            <option>Healthy Individual</option>
                            <option>Type 2 Diabetes</option>
                            <option>Hypertension</option>
                            <option>Cardiovascular Disease</option>
                            <option>Respiratory Condition</option>
                        </select>
                    </div>
                    <button class="healthpulse-btn" onclick="analyzeHealthPulse()">
                        <i class="fas fa-stethoscope"></i> Start Health Analysis
                    </button>
                </div>
                <div class="healthpulse-output" id="healthpulseOutput">
                    <div class="healthpulse-placeholder">
                        <i class="fas fa-heartbeat"></i>
                        <p>Select patient profile and health status to start advanced health monitoring</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStoreOptimizerDemo() {
    return `
        <div class="storeoptimizer-demo-container">
            <div class="storeoptimizer-demo-header">
                <h4>🏪 AI-Powered Store Layout & Customer Flow Optimizer</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>Layout Optimization Engine Active</span>
                </div>
            </div>
            <div class="storeoptimizer-demo-content">
                <div class="storeoptimizer-controls">
                    <div class="control-group">
                        <label>🏬 Retail Format:</label>
                        <select class="storeoptimizer-select" id="storeType">
                            <option>Fashion & Apparel Boutique</option>
                            <option>Electronics Superstore</option>
                            <option>Grocery & Supermarket</option>
                            <option>Home & Garden Center</option>
                            <option>Beauty & Health Store</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>📐 Store Dimensions:</label>
                        <select class="storeoptimizer-select" id="storeSize">
                            <option>Compact Store (500-1000 sq ft)</option>
                            <option>Standard Store (1000-3000 sq ft)</option>
                            <option>Large Store (3000-5000 sq ft)</option>
                            <option>Mega Store (5000+ sq ft)</option>
                        </select>
                    </div>
                    <button class="storeoptimizer-btn" onclick="optimizeStoreLayout()">
                        <i class="fas fa-route"></i> Optimize Customer Flow
                    </button>
                </div>
                <div class="storeoptimizer-output" id="storeoptimizerOutput">
                    <div class="storeoptimizer-placeholder">
                        <i class="fas fa-route"></i>
                        <p>Select retail format and store dimensions to optimize customer flow and layout</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPatientCareDemo() {
    return `
        <div class="patientcare-demo-container">
            <div class="patientcare-demo-header">
                <h4>🏥 Advanced Patient Care Management & Quality Assurance</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>Care Quality Monitoring Active</span>
                </div>
            </div>
            <div class="patientcare-demo-content">
                <div class="patientcare-controls">
                    <div class="control-group">
                        <label>👤 Patient Category:</label>
                        <select class="patientcare-select" id="patientType">
                            <option>General Medical Patient</option>
                            <option>Critical Care Patient</option>
                            <option>Emergency Department Patient</option>
                            <option>Post-Surgical Patient</option>
                            <option>Chronic Care Patient</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label>🏥 Care Intensity:</label>
                        <select class="patientcare-select" id="careLevel">
                            <option>Basic Care (Level 1)</option>
                            <option>Intermediate Care (Level 2)</option>
                            <option>Intensive Care (Level 3)</option>
                            <option>Critical Care (Level 4)</option>
                        </select>
                    </div>
                    <button class="patientcare-btn" onclick="analyzePatientCare()">
                        <i class="fas fa-user-md"></i> Analyze Care Quality
                    </button>
                </div>
                <div class="patientcare-output" id="patientcareOutput">
                    <div class="patientcare-placeholder">
                        <i class="fas fa-user-md"></i>
                        <p>Select patient category and care intensity to analyze care quality and outcomes</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStrategyGeniusDemo() {
    return `
        <div class="strategy-demo-container">
            <div class="strategy-demo-header">
                <h4>🧠 AI-Powered Business Strategy & Market Intelligence</h4>
                <div class="demo-status">
                    <span class="status-dot"></span>
                    <span>Strategy Intelligence Active</span>
                </div>
            </div>
            <div class="strategy-demo-content">
                <div class="strategy-input-section">
                    <div class="input-group">
                        <label>🏢 Business Sector:</label>
                        <select class="strategy-select" id="businessType">
                            <option>Technology & Software</option>
                            <option>E-commerce & Retail</option>
                            <option>Healthcare & Medical</option>
                            <option>Manufacturing & Industrial</option>
                            <option>Financial Services</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>📊 Company Scale:</label>
                        <select class="strategy-select" id="companySize">
                            <option>Startup (1-10 employees)</option>
                            <option>Small Business (11-50 employees)</option>
                            <option>Medium Enterprise (51-200 employees)</option>
                            <option>Large Corporation (200+ employees)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label>🎯 Market Focus:</label>
                        <select class="strategy-select" id="targetMarket">
                            <option>B2B (Business-to-Business)</option>
                            <option>B2C (Business-to-Consumer)</option>
                            <option>B2B2C (Hybrid Model)</option>
                            <option>Enterprise Solutions</option>
                        </select>
                    </div>
                    <button class="strategy-generate-btn" onclick="generateBusinessStrategy()">
                        <i class="fas fa-chess-king"></i> Generate AI Strategy
                    </button>
                </div>
                <div class="strategy-output-section" id="strategyOutput">
                    <div class="strategy-placeholder">
                        <i class="fas fa-chess-king"></i>
                        <p>Select business parameters to generate AI-powered market strategy</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Show Product Details Function
function showProductDetails(productType) {
    console.log('=== PRODUCT DETAILS DEBUG ===');
    console.log('Showing details for:', productType);
    
    // Hide all product detail sections
    const allDetails = document.querySelectorAll('.product-detail-section');
    console.log('Found product detail sections:', allDetails.length);
    allDetails.forEach(detail => {
        detail.style.display = 'none';
        console.log('Hiding section:', detail.id);
    });
    
    // Show the selected product details
    const selectedDetail = document.getElementById(productType + '-details');
    console.log('Selected detail element:', selectedDetail);
    
    if (selectedDetail) {
        selectedDetail.style.display = 'block';
        console.log('Showing section:', selectedDetail.id);
        
        // Scroll to the product details section
        const productDetailsSection = document.getElementById('product-details');
        if (productDetailsSection) {
            console.log('Scrolling to product-details section');
            productDetailsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Load the beautiful demo into the product visual section
        const demoContainer = document.getElementById(productType + '-demo-content');
        console.log('Demo container:', demoContainer);
        
        if (demoContainer) {
            console.log('Loading demo content for:', productType);
            // Load the appropriate demo content
            if (productType === 'mediflow') {
                demoContainer.innerHTML = getMediFlowDemo();
            } else if (productType === 'retailgenius') {
                demoContainer.innerHTML = getRetailGeniusDemo();
            } else if (productType === 'healthpulse') {
                demoContainer.innerHTML = getHealthPulseDemo();
            } else if (productType === 'storeoptimizer') {
                demoContainer.innerHTML = getStoreOptimizerDemo();
            } else if (productType === 'patientcare') {
                demoContainer.innerHTML = getPatientCareDemo();
            } else if (productType === 'strategygenius') {
                demoContainer.innerHTML = getStrategyGeniusDemo();
            } else if (productType === 'numina') {
                // Numina is coming soon - show coming soon message
                demoContainer.innerHTML = `
                    <div class="coming-soon-demo">
                        <div class="coming-soon-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <h3>Numina AI - Coming Soon!</h3>
                        <p>We're working on groundbreaking numerical reasoning capabilities. Stay tuned for updates!</p>
                        <div class="demo-features">
                            <span>• Hybrid Neural-Symbolic AI</span>
                            <span>• Chain-of-Thought Reasoning</span>
                            <span>• Program Synthesis</span>
                            <span>• External Tool Integration</span>
                        </div>
                    </div>
                `;
            }
            console.log('Demo content loaded');
        } else {
            console.error('Demo container not found for:', productType);
        }
        
        console.log('Product details shown successfully');
    } else {
        console.error('Product detail section not found for:', productType);
        alert('Product details not found for: ' + productType);
    }
}

// Modal Demo Functionality
function openDemoModal(productType) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalHeader = modal.querySelector('.modal-header');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset modal header classes
    modalHeader.className = 'modal-header';
    
    switch(productType) {
        case 'dataforge':
            modalTitle.textContent = 'DataForge Intelligence - Live Demo';
            modalBody.innerHTML = getDataForgeDemo();
            modalHeader.classList.add('dataforge');
            break;
        case 'medvision':
            modalTitle.textContent = 'MedVision Analytics - Live Demo';
            modalBody.innerHTML = getMedVisionDemo();
            modalHeader.classList.add('medvision');
            break;
        case 'neurotask':
            modalTitle.textContent = 'NeuroTask Pro - Live Demo';
            modalBody.innerHTML = getNeuroTaskDemo();
            modalHeader.classList.add('neurotask');
            break;
    }
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// DataForge Intelligence Demo
function getDataForgeDemo() {
    return `
        <div class="demo-container">
            <div class="demo-header dataforge-header">
                <h4>DataForge Intelligence - Analytics Platform</h4>
                <div class="demo-controls">
                    <button class="demo-btn active" data-demo="sales">Sales Analytics</button>
                    <button class="demo-btn" data-demo="financial">Financial Intelligence</button>
                    <button class="demo-btn" data-demo="operational">Operational Metrics</button>
                </div>
            </div>
            <div class="demo-content">
                <div class="demo-input">
                    <h5>Data Input</h5>
                    <div class="data-preview" id="reportInput">
                        <div class="data-row">
                            <span>Revenue:</span>
                            <span>$2.4M</span>
                        </div>
                        <div class="data-row">
                            <span>Growth:</span>
                            <span>+28.5%</span>
                        </div>
                        <div class="data-row">
                            <span>Customers:</span>
                            <span>15,420</span>
                        </div>
                    </div>
                    <button class="generate-btn" onclick="generateIntelligenceReport()">
                        <i class="fas fa-brain"></i> Generate Intelligence Report
                    </button>
                </div>
                <div class="demo-output">
                    <h5>AI-Generated Insights</h5>
                    <div class="report-preview" id="reportOutput">
                        <div class="report-header">
                            <h6>Enterprise Intelligence Report</h6>
                            <span class="report-date">Generated: <span id="currentDate">${new Date().toLocaleDateString()}</span></span>
                        </div>
                        <div class="report-content">
                            <div class="report-section">
                                <h6>Executive Intelligence</h6>
                                <p>Advanced analytics reveal 28.5% revenue growth driven by strategic market expansion and optimized customer acquisition channels.</p>
                            </div>
                            <div class="report-chart">
                                <div class="chart-placeholder">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Predictive Analytics Dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// MedVision Analytics Demo
function getMedVisionDemo() {
    return `
        <div class="demo-container health-demo">
            <div class="demo-header medvision-header">
                <h4>MedVision Analytics - Clinical Intelligence</h4>
                <div class="health-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>For demonstration purposes only</span>
                </div>
            </div>
            <div class="demo-content health-content">
                <div class="symptoms-input">
                    <h5>Clinical Data Input</h5>
                    <div class="symptoms-grid" id="symptomsGrid">
                        <div class="symptom-item" data-symptom="fever">
                            <i class="fas fa-thermometer-half"></i>
                            <span>Fever</span>
                        </div>
                        <div class="symptom-item" data-symptom="headache">
                            <i class="fas fa-head-side-virus"></i>
                            <span>Headache</span>
                        </div>
                        <div class="symptom-item" data-symptom="cough">
                            <i class="fas fa-lungs-virus"></i>
                            <span>Cough</span>
                        </div>
                        <div class="symptom-item" data-symptom="fatigue">
                            <i class="fas fa-bed"></i>
                            <span>Fatigue</span>
                        </div>
                        <div class="symptom-item" data-symptom="nausea">
                            <i class="fas fa-stomach"></i>
                            <span>Nausea</span>
                        </div>
                        <div class="symptom-item" data-symptom="rash">
                            <i class="fas fa-hand-paper"></i>
                            <span>Skin Rash</span>
                        </div>
                    </div>
                    <div class="selected-symptoms" id="selectedSymptoms">
                        <span class="selected-label">Selected Symptoms:</span>
                        <div class="selected-list"></div>
                    </div>
                    <button class="predict-btn" onclick="predictDisease()">
                        <i class="fas fa-brain"></i> Analyze Clinical Data
                    </button>
                </div>
                <div class="prediction-output">
                    <h5>Clinical Intelligence Results</h5>
                    <div class="prediction-results" id="predictionResults">
                        <div class="prediction-card">
                            <div class="disease-name">Viral Infection</div>
                            <div class="confidence">Confidence: 94.2%</div>
                            <div class="recommendations">
                                <h6>Clinical Recommendations:</h6>
                                <ul>
                                    <li>Monitor vital signs every 4 hours</li>
                                    <li>Administer antipyretic medication</li>
                                    <li>Schedule follow-up in 48 hours</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// CogniFlow Enterprise Demo
function getNeuroTaskDemo() {
    return `
        <div class="demo-container">
            <div class="demo-header neurotask-header">
                <h4>NeuroTask Pro - AI Task Automation</h4>
                <div class="demo-controls">
                    <button class="demo-btn active" data-demo="workflow">Workflow Automation</button>
                    <button class="demo-btn" data-demo="integration">System Integration</button>
                    <button class="demo-btn" data-demo="optimization">Process Optimization</button>
                </div>
            </div>
            <div class="demo-content">
                <div class="demo-input">
                    <h5>Process Configuration</h5>
                    <div class="data-preview" id="processInput">
                        <div class="data-row">
                            <span>Process Steps:</span>
                            <span>12 Automated</span>
                        </div>
                        <div class="data-row">
                            <span>Efficiency:</span>
                            <span>+75%</span>
                        </div>
                        <div class="data-row">
                            <span>Error Rate:</span>
                            <span>0.1%</span>
                        </div>
                    </div>
                    <button class="generate-btn" onclick="generateProcessReport()">
                        <i class="fas fa-cogs"></i> Execute Process
                    </button>
                </div>
                <div class="demo-output">
                    <h5>Automation Results</h5>
                    <div class="report-preview" id="processOutput">
                        <div class="report-header">
                            <h6>Enterprise Process Report</h6>
                            <span class="report-date">Executed: <span id="currentDate">${new Date().toLocaleDateString()}</span></span>
                        </div>
                        <div class="report-content">
                            <div class="report-section">
                                <h6>Process Intelligence</h6>
                                <p>Automated workflow execution achieved 75% efficiency improvement with 99.9% accuracy rate across all business processes.</p>
                            </div>
                            <div class="report-chart">
                                <div class="chart-placeholder">
                                    <i class="fas fa-cogs"></i>
                                    <span>Process Flow Visualization</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Demo button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString();
    }
    
    // Add event listeners for modal demo buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('demo-btn')) {
            // Remove active class from all buttons in the same container
            const container = e.target.closest('.demo-container');
            const demoButtons = container.querySelectorAll('.demo-btn');
            demoButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
        }
    });
    
    // Add event listeners for symptom items in modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.symptom-item')) {
            const symptomItem = e.target.closest('.symptom-item');
            const symptom = symptomItem.dataset.symptom;
            toggleSymptom(symptom, symptomItem);
        }
    });
});

function updateReportData() {
    const data = reportData[currentReportType];
    const reportInput = document.getElementById('reportInput');
    const reportOutput = document.getElementById('reportOutput');
    
    if (reportInput && reportOutput) {
        // Update input data
        reportInput.innerHTML = data.data.map(item => 
            `<div class="data-row">
                <span>${item.label}</span>
                <span>${item.value}</span>
            </div>`
        ).join('');
        
        // Update output report
        reportOutput.innerHTML = `
            <div class="report-header">
                <h6>${data.title}</h6>
                <span class="report-date">Generated: <span id="currentDate">${new Date().toLocaleDateString()}</span></span>
            </div>
            <div class="report-content">
                <div class="report-section">
                    <h6>Executive Summary</h6>
                    <p>${data.summary}</p>
                </div>
                <div class="report-chart">
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-line"></i>
                        <span>${data.chart}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function generateIntelligenceReport() {
    const generateBtn = document.querySelector('.generate-btn');
    const reportOutput = document.getElementById('reportOutput');
    
    if (generateBtn && reportOutput) {
        // Show loading state
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Intelligence...';
        generateBtn.disabled = true;
        
        // Simulate report generation
        setTimeout(() => {
            generateBtn.innerHTML = '<i class="fas fa-check"></i> Intelligence Generated!';
            generateBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Add animation to report
            reportOutput.style.transform = 'scale(1.02)';
            reportOutput.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                reportOutput.style.transform = 'scale(1)';
                generateBtn.innerHTML = '<i class="fas fa-brain"></i> Generate Intelligence Report';
                generateBtn.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
                generateBtn.disabled = false;
            }, 2000);
        }, 2000);
    }
}

function generateProcessReport() {
    const generateBtn = document.querySelector('.generate-btn');
    const processOutput = document.getElementById('processOutput');
    
    if (generateBtn && processOutput) {
        // Show loading state
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing Process...';
        generateBtn.disabled = true;
        
        // Simulate process execution
        setTimeout(() => {
            generateBtn.innerHTML = '<i class="fas fa-check"></i> Process Executed!';
            generateBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Add animation to report
            processOutput.style.transform = 'scale(1.02)';
            processOutput.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                processOutput.style.transform = 'scale(1)';
                generateBtn.innerHTML = '<i class="fas fa-cogs"></i> Execute Process';
                generateBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
                generateBtn.disabled = false;
            }, 2000);
        }, 2000);
    }
}

// Health Prediction Demo Functionality
let selectedSymptoms = [];

document.addEventListener('DOMContentLoaded', function() {
    const symptomItems = document.querySelectorAll('.symptom-item');
    symptomItems.forEach(item => {
        item.addEventListener('click', function() {
            const symptom = this.dataset.symptom;
            toggleSymptom(symptom, this);
        });
    });
});

function toggleSymptom(symptom, element) {
    if (selectedSymptoms.includes(symptom)) {
        // Remove symptom
        selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
        element.classList.remove('selected');
    } else {
        // Add symptom
        selectedSymptoms.push(symptom);
        element.classList.add('selected');
    }
    
    updateSelectedSymptoms();
}

function updateSelectedSymptoms() {
    const selectedList = document.querySelector('.selected-list');
    if (selectedList) {
        selectedList.innerHTML = selectedSymptoms.map(symptom => 
            `<span class="selected-symptom">${symptom.charAt(0).toUpperCase() + symptom.slice(1)}</span>`
        ).join('');
    }
}

function predictDisease() {
    const predictBtn = document.querySelector('.predict-btn');
    const predictionResults = document.getElementById('predictionResults');
    
    if (predictBtn && predictionResults && selectedSymptoms.length > 0) {
        // Show loading state
        predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Clinical Data...';
        predictBtn.disabled = true;
        
        // Simulate AI prediction
        setTimeout(() => {
            const prediction = getDiseasePrediction(selectedSymptoms);
            
            predictBtn.innerHTML = '<i class="fas fa-check"></i> Analysis Complete!';
            predictBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Update prediction results
            predictionResults.innerHTML = `
                <div class="prediction-card">
                    <div class="disease-name">${prediction.disease}</div>
                    <div class="confidence">Confidence: ${prediction.confidence}%</div>
                    <div class="recommendations">
                        <h6>Clinical Recommendations:</h6>
                        <ul>
                            ${prediction.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            // Add animation
            predictionResults.style.transform = 'scale(1.02)';
            predictionResults.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                predictionResults.style.transform = 'scale(1)';
                predictBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Clinical Data';
                predictBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
                predictBtn.disabled = false;
            }, 2000);
        }, 2500);
    } else if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom before analyzing.');
    }
}

function getDiseasePrediction(symptoms) {
    // Simple AI-like prediction logic based on symptoms
    const predictions = {
        'fever,headache,cough': {
            disease: 'Common Cold',
            confidence: 85,
            recommendations: [
                'Rest and stay hydrated',
                'Over-the-counter pain relief',
                'Consult doctor if symptoms worsen'
            ]
        },
        'fever,headache,fatigue': {
            disease: 'Viral Infection',
            confidence: 78,
            recommendations: [
                'Get plenty of rest',
                'Stay hydrated with fluids',
                'Monitor temperature regularly'
            ]
        },
        'fever,cough,fatigue': {
            disease: 'Respiratory Infection',
            confidence: 82,
            recommendations: [
                'Use humidifier for breathing',
                'Avoid smoking and pollutants',
                'Seek medical attention if severe'
            ]
        },
        'nausea,fatigue,headache': {
            disease: 'Gastrointestinal Issue',
            confidence: 75,
            recommendations: [
                'Eat light, bland foods',
                'Avoid dairy and spicy foods',
                'Stay hydrated with clear liquids'
            ]
        },
        'rash,fever,headache': {
            disease: 'Allergic Reaction',
            confidence: 88,
            recommendations: [
                'Avoid known allergens',
                'Apply cool compress to rash',
                'Consider antihistamines'
            ]
        }
    };
    
    const symptomKey = symptoms.sort().join(',');
    
    // Find best match or return default
    for (const [key, prediction] of Object.entries(predictions)) {
        if (symptomKey.includes(key.split(',')[0]) && symptomKey.includes(key.split(',')[1])) {
            return prediction;
        }
    }
    
    // Default prediction
    return {
        disease: 'General Illness',
        confidence: 65,
        recommendations: [
            'Monitor symptoms closely',
            'Get adequate rest',
            'Consult healthcare provider',
            'Stay hydrated and eat well'
        ]
    };
}

// StratBot AI Chatbot Functionality
let isChatbotOpen = false;

// Company Information for Chatbot
const companyInfo = {
    name: "StratgenAI",
    tagline: "Advanced AI-Powered Business Strategy Solutions",
    description: "We are a revolutionary AI consulting company that transforms healthcare and retail industries through cutting-edge artificial intelligence. Our proprietary AI algorithms and machine learning models deliver unprecedented insights, automate complex processes, and create intelligent business ecosystems that adapt and evolve with your organization's needs.",
    
    products: [
        {
            name: "MediFlow AI",
            description: "Advanced healthcare operations optimization platform",
            features: ["Real-time patient monitoring", "Staff scheduling optimization", "Resource allocation", "Predictive analytics"]
        },
        {
            name: "RetailGenius AI", 
            description: "Advanced retail intelligence and customer analytics platform",
            features: ["Customer behavior analysis", "Inventory optimization", "Sales forecasting", "Market trend analysis"]
        },
        {
            name: "HealthPulse AI",
            description: "Advanced health monitoring and predictive analytics platform",
            features: ["Vital signs monitoring", "Health risk prediction", "Personalized recommendations", "24/7 health tracking"]
        },
        {
            name: "StoreOptimizer AI",
            description: "Advanced store layout optimization platform",
            features: ["Customer flow analysis", "Product placement optimization", "Sales efficiency maximization", "Layout recommendations"]
        },
        {
            name: "PatientCare AI",
            description: "Advanced patient care management platform",
            features: ["Care protocol optimization", "Patient outcome monitoring", "Quality healthcare delivery", "Care coordination"]
        },
        {
            name: "StrategyGenius AI",
            description: "Advanced AI business strategy consultant",
            features: ["Market analysis", "Strategic planning", "Business optimization", "Growth recommendations"]
        }
    ],
    
    services: [
        "AI Strategy Consulting",
        "Healthcare AI Solutions",
        "Retail AI Solutions", 
        "Data Analytics & Insights",
        "Custom AI Development",
        "AI Implementation & Support"
    ],
    
    contact: {
        email: "hello@stratgenai.com",
        phone: "+1 (555) 123-4567",
        address: "123 AI Innovation Drive, Tech City, TC 12345",
        website: "www.stratgenai.com"
    },
    
    targetAudience: "Healthcare and Retail industries",
    founded: "2025",
    team: "Expert AI engineers, data scientists, and business strategists"
};

// Enhanced StratBot AI Responses
const chatbotResponses = {
    greetings: [
        "Hello! I'm StratBot AI, your intelligent assistant from StratgenAI. I'm here to help you learn about our AI solutions, company services, and connect you with our team. How can I assist you today?",
        "Hi there! Welcome to StratgenAI. I'm StratBot AI, your dedicated assistant for all things AI. I can help you explore our products, understand our services, or answer any questions about our company. What would you like to know?",
        "Greetings! I'm StratBot AI, powered by StratgenAI's advanced AI technology. I specialize in helping visitors understand our AI solutions for healthcare, retail, and business intelligence. How may I help you today?"
    ],
    
    company: [
        `We are ${companyInfo.name} - ${companyInfo.tagline}. ${companyInfo.description}`,
        `Our company specializes in ${companyInfo.targetAudience} solutions with ${companyInfo.team}.`,
        `Founded in ${companyInfo.founded}, we provide cutting-edge AI solutions for modern businesses.`,
        "StratgenAI is a leading women-led technology company specializing in artificial intelligence, machine learning, and full-stack development solutions. We empower organizations across various sectors to harness the power of AI for enhanced productivity, predictive analytics, and intelligent automation. Our mission is to bridge the gap between the Silent Generation and Gen Alpha with AI that speaks your language.",
        "We are StratgenAI, a pioneering AI company founded by visionary women leaders. We specialize in creating AI solutions that revolutionize how businesses operate, from healthcare operations to retail intelligence. Our team combines deep technical expertise with innovative thinking to deliver cutting-edge AI products that drive real business results."
    ],
    
    products: [
        "We offer several cutting-edge AI products: MediFlow AI for healthcare operations optimization (95% efficiency improvement), RetailGenius AI for retail intelligence and customer behavior analysis (35% sales boost), HealthPulse AI for medical diagnosis (94.2% accuracy), StoreOptimizer AI for retail management (25% traffic increase), PatientCare AI for healthcare monitoring (40% time savings), StrategyGenius AI for business strategy (300% ROI), and Numina AI (coming soon) for numerical reasoning. Each product is designed to solve specific business challenges with advanced AI technology.",
        "Our AI product suite includes: MediFlow AI (healthcare workflow optimization), RetailGenius AI (customer behavior analysis), HealthPulse AI (medical diagnosis), StoreOptimizer AI (retail management), PatientCare AI (health monitoring), StrategyGenius AI (business strategy), and Numina AI (launching soon) for mathematical problem-solving. All products deliver measurable business impact with enterprise-grade security and scalability.",
        "StratgenAI's comprehensive product portfolio features: MediFlow AI for healthcare operations, RetailGenius AI for retail analytics, HealthPulse AI for medical diagnosis, StoreOptimizer AI for store optimization, PatientCare AI for patient care, StrategyGenius AI for business strategy, and Numina AI for numerical reasoning. Each solution is built with advanced machine learning algorithms and delivers proven ROI."
    ],
    
    services: [
        `Our services include: ${companyInfo.services.join(', ')}.`,
        "We provide comprehensive AI services including: AI Strategy Consulting, Custom AI Development, Machine Learning Implementation, Data Analytics & Insights, AI Integration Services, Training & Support, and Ongoing Maintenance. Our team works closely with clients to understand their unique needs and deliver tailored AI solutions that drive business growth.",
        "Our services encompass: AI Strategy Development, Custom AI Solution Design, Machine Learning Model Development, Data Processing & Analysis, AI System Integration, Performance Optimization, Staff Training, and 24/7 Technical Support. We ensure seamless implementation and maximum ROI for all our AI solutions."
    ],
    
    contact: [
        "You can reach us at hello@stratgenai.com or call us at 09316126622. We're also active on social media @stratgenai on Twitter, Instagram, and Threads.",
        "Contact StratgenAI through: Email (hello@stratgenai.com), Phone (09316126622), or Social Media (@stratgenai on Twitter, Instagram, Threads). Our team is ready to discuss your AI needs and provide personalized solutions. We typically respond within 24 hours.",
        "Get in touch with us via: Email at hello@stratgenai.com, Phone at 09316126622, or follow us on social media @stratgenai. We offer free initial consultations to understand your AI requirements and provide tailored recommendations. Our expert team is here to help you leverage AI for business success."
    ],
    
    pricing: [
        "Our pricing is customized based on your specific needs, project scope, and requirements. We offer flexible pricing models including project-based, subscription-based, and enterprise solutions. Contact our sales team for a personalized quote. We also provide free consultations to assess your AI needs and recommend the most cost-effective solution.",
        "Pricing varies depending on the AI solution, implementation complexity, and ongoing support requirements. We offer competitive rates with flexible payment options. Schedule a consultation with our team to discuss your project and receive a detailed quote tailored to your budget and objectives.",
        "We provide transparent, competitive pricing for all our AI services and products. Our pricing structure is designed to offer maximum value while fitting your budget. Contact us for a detailed quote based on your specific requirements and project scope."
    ],
    
    default: [
        "I apologize, but I don't have specific information about that topic. As StratBot AI, I'm designed to help with StratgenAI's products, services, company information, and contact details. Could you please ask about our AI solutions, healthcare products, retail intelligence, or how to contact our team?",
        "I'm sorry, but I don't have the answer to that question. I specialize in StratgenAI information and can help you with details about our AI products (MediFlow, RetailGenius, HealthPulse, StoreOptimizer, PatientCare, StrategyGenius, Numina), our services, company information, or help you get in touch with our team. What would you like to know more about?",
        "I apologize, but I'm not able to provide information on that topic. I'm here to help you with StratgenAI-related information. I can assist you with our AI products, services, company details, or connect you with our team for more specific inquiries. How can I help you today?"
    ]
};

// Function to generate chatbot response
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
    }
    
    // Company information
    if (lowerMessage.includes('company') || lowerMessage.includes('about') || lowerMessage.includes('who are you')) {
        return chatbotResponses.company[Math.floor(Math.random() * chatbotResponses.company.length)];
    }
    
    // Products
    if (lowerMessage.includes('product') || lowerMessage.includes('solution') || lowerMessage.includes('ai')) {
        return chatbotResponses.products[Math.floor(Math.random() * chatbotResponses.products.length)];
    }
    
    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
        return chatbotResponses.services[Math.floor(Math.random() * chatbotResponses.services.length)];
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('address')) {
        return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        return chatbotResponses.pricing[Math.floor(Math.random() * chatbotResponses.pricing.length)];
    }
    
    // Specific product queries with enhanced responses
    if (lowerMessage.includes('mediflow')) {
        return "MediFlow AI is our advanced healthcare operations optimization platform that delivers 95% efficiency improvement. It provides real-time patient monitoring, intelligent staff scheduling, resource allocation optimization, and predictive analytics for healthcare facilities. The system reduces operational costs by 40% while improving patient care outcomes.";
    }
    
    if (lowerMessage.includes('retailgenius')) {
        return "RetailGenius AI is our advanced retail intelligence platform that boosts sales by 35%. It offers comprehensive customer behavior analysis, inventory optimization, sales forecasting, market trend analysis, and personalized marketing recommendations for retail businesses.";
    }
    
    if (lowerMessage.includes('healthpulse')) {
        return "HealthPulse AI is our advanced health monitoring platform with 94.2% diagnostic accuracy. It provides vital signs monitoring, health risk prediction, personalized recommendations, 24/7 health tracking, and early disease detection capabilities.";
    }
    
    if (lowerMessage.includes('storeoptimizer')) {
        return "StoreOptimizer AI is our retail management solution that increases store traffic by 25%. It provides store layout optimization, customer flow analysis, inventory management, staff scheduling, and performance analytics for retail businesses.";
    }
    
    if (lowerMessage.includes('patientcare')) {
        return "PatientCare AI is our healthcare monitoring system that saves 40% of time for healthcare providers. It offers automated patient monitoring, health alerts, medication reminders, appointment scheduling, and comprehensive health record management.";
    }
    
    if (lowerMessage.includes('strategygenius')) {
        return "StrategyGenius AI is our business strategy platform that delivers 300% ROI. It provides market analysis, competitive intelligence, strategic planning, performance tracking, and data-driven business recommendations for enterprises.";
    }
    
    if (lowerMessage.includes('numina')) {
        return "Numina AI is our upcoming revolutionary numerical reasoning platform. It addresses the critical challenge of mathematical problem-solving in AI systems using hybrid neural-symbolic approaches, chain-of-thought reasoning, and external tool integration. Launching soon!";
    }
    
    // General AI and technology questions
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
        return "AI and machine learning are at the core of all our solutions at StratgenAI. We specialize in developing custom AI systems for healthcare, retail, and business intelligence. Our products like MediFlow AI, RetailGenius AI, and HealthPulse AI demonstrate our expertise in creating practical AI solutions that deliver real business value.";
    }
    
    // Team and founders questions
    if (lowerMessage.includes('team') || lowerMessage.includes('founder') || lowerMessage.includes('who founded')) {
        return "StratgenAI is founded by three visionary women leaders: Krisha Patel (AI systems expert), Sheefa Memon (business strategy specialist), and Niyanta Meswaniya (technology innovation leader). Our diverse team combines deep technical expertise with innovative thinking to deliver cutting-edge AI solutions.";
    }
    
    // Technology and innovation questions
    if (lowerMessage.includes('technology') || lowerMessage.includes('innovation') || lowerMessage.includes('cutting edge')) {
        return "At StratgenAI, we leverage cutting-edge technologies including machine learning, deep learning, natural language processing, computer vision, and predictive analytics. Our innovative approach combines advanced AI algorithms with practical business applications to create solutions that drive real results.";
    }
    
    // Business and industry questions
    if (lowerMessage.includes('business') || lowerMessage.includes('industry') || lowerMessage.includes('market')) {
        return "StratgenAI serves multiple industries including healthcare, retail, e-commerce, manufacturing, and professional services. Our AI solutions help businesses optimize operations, improve customer experiences, increase efficiency, and drive growth across various sectors.";
    }
    
    // Help and support questions
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist')) {
        return "I'm here to help! I can provide detailed information about StratgenAI's AI products, services, company details, pricing, or contact information. What specific information would you like to know about our AI solutions?";
    }
    
    // Demo and trial questions
    if (lowerMessage.includes('demo') || lowerMessage.includes('trial') || lowerMessage.includes('test')) {
        return "We offer free consultations and product demonstrations for all our AI solutions. Contact our team to schedule a personalized demo where we can show you how our AI products can benefit your specific business needs. We also provide trial periods for most of our solutions.";
    }
    
    if (lowerMessage.includes('storeoptimizer')) {
        return "StoreOptimizer AI is our advanced store layout optimization platform that increases traffic by 25%. It analyzes customer flow patterns, optimizes product placement, maximizes sales efficiency, and provides data-driven layout recommendations.";
    }
    
    if (lowerMessage.includes('patientcare')) {
        return "PatientCare AI is our advanced patient care management platform that saves 40% of healthcare time. It optimizes care protocols, monitors patient outcomes, ensures quality healthcare delivery, and coordinates care effectively across healthcare teams.";
    }
    
    if (lowerMessage.includes('strategygenius')) {
        return "StrategyGenius AI is our advanced AI business strategy consultant that delivers 300% ROI. It provides comprehensive market analysis, strategic planning, business optimization, competitive intelligence, and growth recommendations for businesses.";
    }
    
    if (lowerMessage.includes('numina')) {
        return "Numina AI is our upcoming revolutionary numerical reasoning platform. It addresses the critical challenge of mathematical problem-solving in AI systems using hybrid neural-symbolic approaches, chain-of-thought reasoning, and external tool integration. Launching soon!";
    }
    
    // Enhanced context-aware responses
    if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
        return "I'm here to help! I can provide detailed information about StratgenAI's AI products, services, company details, pricing, or contact information. What specific information would you like to know about our AI solutions?";
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('show')) {
        return "I'd be happy to help you learn about our AI solutions! You can explore our products section on the website to see detailed demos of MediFlow AI, RetailGenius AI, HealthPulse AI, and other solutions. Would you like me to tell you more about any specific product?";
    }
    
    if (lowerMessage.includes('team') || lowerMessage.includes('founder')) {
        return "StratgenAI is led by visionary women founders who are experts in AI, machine learning, and business strategy. Our team includes experienced AI engineers, data scientists, and business strategists. You can learn more about our founders in the 'Meet Our Founders' section of our website.";
    }
    
    // Default response
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

// Toggle chatbot visibility
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    
    isChatbotOpen = !isChatbotOpen;
    
    if (isChatbotOpen) {
        chatbotWindow.classList.remove('chatbot-hidden');
        chatbotToggle.style.transform = 'scale(1.1)';
    } else {
        chatbotWindow.classList.add('chatbot-hidden');
        chatbotToggle.style.transform = 'scale(1)';
    }
}

// Send message function
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show loading
    const sendButton = document.getElementById('chatbot-send');
    const originalContent = sendButton.innerHTML;
    sendButton.innerHTML = '<div class="loading"></div>';
    sendButton.disabled = true;
    
    // Generate response after a short delay
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
        
        // Reset button
        sendButton.innerHTML = originalContent;
        sendButton.disabled = false;
        
        // Scroll to bottom
        scrollToBottom();
    }, 1000);
}

// Send quick message
function sendQuickMessage(message) {
    const input = document.getElementById('chatbot-input');
    input.value = message;
    sendMessage();
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const iconClass = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="${iconClass} message-icon"></i>
            <div class="message-text">${text}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Contact Form Functionality
function handleContactForm(event) {
    event.preventDefault();
    
    console.log('Contact form submitted');
    
    // Get form data
    const formData = new FormData(event.target);
    const formObject = {};
    
    // Get all form inputs
    const inputs = event.target.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.name || input.placeholder) {
            const key = input.name || input.placeholder.toLowerCase().replace(/\s+/g, '_');
            formObject[key] = input.value;
        }
    });
    
    console.log('Form data:', formObject);
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showContactMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
        
        // Reset form
        event.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('Form submitted successfully');
    }, 2000);
}

// Show contact form messages
function showContactMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.contact-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .contact-message .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .contact-message i {
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}