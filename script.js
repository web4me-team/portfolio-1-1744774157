// Minimal Template JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Intersection Observer for animations
    const timelineItems = document.querySelectorAll('.timeline-item, .project-item, .publication-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Function to parse URL parameters for resume data
    function getResumeData() {
        const urlParams = new URLSearchParams(window.location.search);
        const resumeDataParam = urlParams.get('resumeData');
        
        if (resumeDataParam) {
            try {
                return JSON.parse(decodeURIComponent(resumeDataParam));
            } catch (error) {
                console.error('Error parsing resume data:', error);
                return null;
            }
        }
        return null;
    }

    // Function to populate sections with resume data
    function populateResumeData() {
        const resumeData = getResumeData();
        if (!resumeData) return;
        
        // Update Personal Info
        if (resumeData.personalInfo) {
            const info = resumeData.personalInfo;
            // Update name, email, phone, location, summary
            if (info.name) document.querySelector('h1').textContent = info.name;
            if (info.Summary) document.querySelector('.summary').textContent = info.Summary;
            
            // Update contact section
            if (info.email) {
                const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
                emailLinks.forEach(link => {
                    link.href = `mailto:${info.email}`;
                    if (link.textContent === 'yourname@example.com') {
                        link.textContent = info.email;
                    }
                });
            }
            
            if (info.phone) {
                const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
                phoneLinks.forEach(link => {
                    link.href = `tel:${info.phone}`;
                    if (link.textContent === '+1 (123) 456-7890') {
                        link.textContent = info.phone;
                    }
                });
            }
            
            if (info.location) {
                const locationEl = document.querySelector('.contact-info p:nth-child(3)');
                if (locationEl) {
                    locationEl.innerHTML = `<strong>Location:</strong> ${info.location}`;
                }
            }
            
            // Update social links
            if (info.socialLinks) {
                const socialLinks = document.querySelectorAll('.social-links a, .social-icons a');
                socialLinks.forEach(link => {
                    if (link.textContent.includes('LinkedIn') && info.socialLinks.linkedin) {
                        link.href = info.socialLinks.linkedin;
                    }
                    if (link.textContent.includes('Twitter') && info.socialLinks['Social Media']) {
                        link.href = info.socialLinks['Social Media'];
                    }
                    if (link.textContent.includes('Google Scholar') && info.socialLinks['Google Scholar']) {
                        link.href = info.socialLinks['Google Scholar'];
                    }
                });
            }
        }
        
        // Update Research Interests
        if (resumeData.researchInterests && resumeData.researchInterests.length) {
            const container = document.getElementById('research-interests-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.researchInterests.forEach(interest => {
                    const interestEl = document.createElement('div');
                    interestEl.className = 'research-interest';
                    interestEl.innerHTML = `
                        <h3 class="research-field">${interest.field || ''}</h3>
                        <p class="research-description">${interest.description || ''}</p>
                    `;
                    container.appendChild(interestEl);
                });
            }
        }
        
        // Update Education
        if (resumeData.education && resumeData.education.length) {
            const container = document.getElementById('education-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.education.forEach(edu => {
                    const eduEl = document.createElement('div');
                    eduEl.className = 'timeline-item';
                    eduEl.innerHTML = `
                        <h3>${edu.degree || ''}</h3>
                        <span class="graduation-date">${edu.graduationDate || ''}</span>
                        <p class="school">${edu.school || ''}</p>
                        <p class="field">${edu.field || ''}</p>
                        ${edu.thesis ? `<p class="thesis"><strong>Thesis:</strong> "${edu.thesis}"</p>` : ''}
                    `;
                    container.appendChild(eduEl);
                });
            }
        }
        
        // Update Work Experience
        if (resumeData.workExperience && resumeData.workExperience.length) {
            const container = document.getElementById('experience-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.workExperience.forEach(exp => {
                    const expEl = document.createElement('div');
                    expEl.className = 'timeline-item';
                    
                    let descriptionHTML = '';
                    if (exp.description && exp.description.length) {
                        descriptionHTML = `
                            <div class="description">
                                <ul>
                                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    let techniquesHTML = '';
                    if (exp.techniques && exp.techniques.length) {
                        techniquesHTML = `
                            <div class="techniques">
                                ${exp.techniques.map(tech => `<span class="technique-tag">${tech}</span>`).join('')}
                            </div>
                        `;
                    }
                    
                    expEl.innerHTML = `
                        <h3 class="position">${exp.position || ''}</h3>
                        <p class="institution">${exp.institution || ''}</p>
                        <span class="duration">${exp.duration || ''}</span>
                        ${descriptionHTML}
                        ${techniquesHTML}
                    `;
                    container.appendChild(expEl);
                });
            }
        }
        
        // Update Projects
        if (resumeData.projects && resumeData.projects.length) {
            const container = document.getElementById('projects-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.projects.forEach(proj => {
                    const projEl = document.createElement('div');
                    projEl.className = 'project-item';
                    
                    let techHTML = '';
                    if (proj.technologies && proj.technologies.length) {
                        techHTML = `
                            <div class="project-tech">
                                ${proj.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        `;
                    }
                    
                    let outcomesHTML = '';
                    if (proj.outcomes && proj.outcomes.length) {
                        outcomesHTML = `
                            <div class="project-outcomes">
                                <h4>Outcomes:</h4>
                                <ul>
                                    ${proj.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    projEl.innerHTML = `
                        <h3 class="project-title">${proj.title || ''}</h3>
                        <p class="project-duration">${proj.duration || ''}</p>
                        <p class="project-description">${proj.description || ''}</p>
                        ${techHTML}
                        ${outcomesHTML}
                    `;
                    container.appendChild(projEl);
                });
            }
        }
        
        // Update Publications
        if (resumeData.publications && resumeData.publications.length) {
            const container = document.getElementById('publications-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.publications.forEach(pub => {
                    const pubEl = document.createElement('div');
                    pubEl.className = 'publication-item';
                    
                    let authorsText = '';
                    if (pub.authors && pub.authors.length) {
                        authorsText = pub.authors.join(', ');
                    }
                    
                    pubEl.innerHTML = `
                        <h3 class="publication-title">${pub.title || ''}</h3>
                        <div class="publication-meta">
                            <span class="publication-journal">${pub.journal || ''}</span>
                            <span class="publication-year">${pub.year || ''}</span>
                        </div>
                        <p class="publication-authors">${authorsText}</p>
                        <div class="publication-links">
                            ${pub.links ? `<a href="${pub.links}" target="_blank">View Paper</a>` : ''}
                        </div>
                    `;
                    container.appendChild(pubEl);
                });
            }
        }
        
        // Update Technical Skills
        if (resumeData.technicalSkills && resumeData.technicalSkills.length) {
            const container = document.getElementById('technical-skills-container');
            if (container && container.querySelector('.skills-list')) {
                const skillsList = container.querySelector('.skills-list');
                skillsList.innerHTML = '';
                
                resumeData.technicalSkills.forEach(skill => {
                    const skillEl = document.createElement('span');
                    skillEl.className = 'skill-item';
                    skillEl.textContent = skill;
                    skillsList.appendChild(skillEl);
                });
            }
        }
        
        // Update Teaching Experience
        if (resumeData.teachingExperience && resumeData.teachingExperience.length) {
            const container = document.getElementById('teaching-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.teachingExperience.forEach(teach => {
                    const teachEl = document.createElement('div');
                    teachEl.className = 'timeline-item';
                    
                    let coursesHTML = '';
                    if (teach.courses && teach.courses.length) {
                        coursesHTML = `
                            <div class="courses">
                                <h4>Courses:</h4>
                                <ul>
                                    ${teach.courses.map(course => `<li>${course}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    teachEl.innerHTML = `
                        <h3 class="teaching-role">${teach.role || ''}</h3>
                        <p class="teaching-institution">${teach.institution || ''}</p>
                        <span class="teaching-duration">${teach.duration || ''}</span>
                        ${coursesHTML}
                    `;
                    container.appendChild(teachEl);
                });
            }
        }
        
        // Update Honors & Awards
        if (resumeData.honorsAndAwards && resumeData.honorsAndAwards.length) {
            const container = document.getElementById('awards-container');
            if (container) {
                container.innerHTML = '';
                
                resumeData.honorsAndAwards.forEach(award => {
                    const awardEl = document.createElement('div');
                    awardEl.className = 'timeline-item';
                    awardEl.innerHTML = `
                        <h3 class="award-name">${award.name || ''}</h3>
                        <span class="award-year">${award.year || ''}</span>
                        <p class="award-issuer">${award.issuer || ''}</p>
                    `;
                    container.appendChild(awardEl);
                });
            }
        }
    }

    // Call the function to populate data
    populateResumeData();
}); 