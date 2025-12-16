document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');
    const resumePreview = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const skillDropdown = document.getElementById('skillDropdown');
    const skillsInput = document.getElementById('skills');

    const eduContainer = document.getElementById('education-container');
    const expContainer = document.getElementById('experience-container');
    const projContainer = document.getElementById('projects-container');
    const achContainer = document.getElementById('achievements-container');

    const addEduBtn = document.getElementById('add-education-btn');
    const addExpBtn = document.getElementById('add-experience-btn');
    const addProjBtn = document.getElementById('add-project-btn');
    const addAchBtn = document.getElementById('add-achievement-btn');

    function createInput(type, placeholder, className = '') {
        const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
        if (type !== 'textarea') input.type = type;
        input.placeholder = placeholder;
        if (className) input.className = className;
        if (type === 'textarea') input.rows = 3;
        return input;
    }

    function addEducation() {
        const div = document.createElement('div');
        div.className = 'form-section dynamic-item';
        div.style.borderBottom = '1px dashed #ccc';
        div.style.marginBottom = '1rem';
        div.style.paddingBottom = '1rem';

        const degree = createInput('text', 'Degree');
        degree.className = 'edu-degree-input';

        const college = createInput('text', 'College / University');
        college.className = 'edu-college-input';
        college.style.marginTop = '0.5rem';

        const row = document.createElement('div');
        row.className = 'form-row';
        row.style.marginTop = '0.5rem';

        const year = createInput('text', 'Year of Passout');
        year.className = 'edu-year-input';

        const grade = createInput('text', 'CGPA / Percentage');
        grade.className = 'edu-grade-input';

        row.appendChild(year);
        row.appendChild(grade);

        div.appendChild(degree);
        div.appendChild(college);
        div.appendChild(row);

        eduContainer.appendChild(div);
        updatePreview();
    }

    function addExperience() {
        const div = document.createElement('div');
        div.className = 'project-block dynamic-item';
        div.style.marginBottom = '1rem';

        const role = createInput('text', 'Role (e.g., Student Intern)');
        role.className = 'exp-role-input';

        const company = createInput('text', 'Company | Location');
        company.className = 'exp-company-input';
        company.style.marginTop = '0.5rem';

        const duration = createInput('text', 'Duration (e.g., May 2025 - Present)');
        duration.className = 'exp-duration-input';
        duration.style.marginTop = '0.5rem';

        const tech = createInput('text', 'Technology Used (Optional)');
        tech.className = 'exp-tech-input';
        tech.style.marginTop = '0.5rem';

        const desc = createInput('textarea', 'Description (Bullet points)...');
        desc.className = 'exp-desc-input';
        desc.style.marginTop = '0.5rem';

        div.appendChild(role);
        div.appendChild(company);
        div.appendChild(duration);
        div.appendChild(tech);
        div.appendChild(desc);

        expContainer.appendChild(div);
        updatePreview();
    }

    function addProject() {
        const div = document.createElement('div');
        div.className = 'project-block dynamic-item';
        div.style.marginBottom = '1rem';

        const name = createInput('text', 'Project Name');
        name.className = 'proj-name-input';

        const stack = createInput('text', 'Tech Stack (e.g., Python, SQL)');
        stack.className = 'proj-stack-input';
        stack.style.marginTop = '0.5rem';

        const desc = createInput('textarea', 'Description...');
        desc.className = 'proj-desc-input';
        desc.style.marginTop = '0.5rem';

        div.appendChild(name);
        div.appendChild(stack);
        div.appendChild(desc);

        projContainer.appendChild(div);
        updatePreview();
    }

    function addAchievement() {
        const div = document.createElement('div');
        div.className = 'project-block dynamic-item';
        div.style.marginBottom = '1rem';

        const title = createInput('text', 'Title / Activity');
        title.className = 'ach-title-input';

        const date = createInput('text', 'Date (e.g., Jun 2024)');
        date.className = 'ach-date-input';
        date.style.marginTop = '0.5rem';

        const desc = createInput('textarea', 'Description (Optional)...');
        desc.className = 'ach-desc-input';
        desc.style.marginTop = '0.5rem';

        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(desc);

        achContainer.appendChild(div);
        updatePreview();
    }

    addEducation();
    addExperience();
    addProject();
    addAchievement();

    addEduBtn.addEventListener('click', addEducation);
    addExpBtn.addEventListener('click', addExperience);
    addProjBtn.addEventListener('click', addProject);
    addAchBtn.addEventListener('click', addAchievement);


    skillDropdown.addEventListener('change', (e) => {
        const selectedSkill = e.target.value;
        if (selectedSkill) {
            const currentSkills = skillsInput.value.trim();
            if (currentSkills) {
                skillsInput.value = currentSkills + ', ' + selectedSkill;
            } else {
                skillsInput.value = selectedSkill;
            }
            e.target.value = '';
            updatePreview();
        }
    });

    function updatePreview() {
        const collectDynamicData = (container, selectors) => {
            const items = container.querySelectorAll('.dynamic-item');
            return Array.from(items).map(item => {
                const obj = {};
                for (const key in selectors) {
                    const input = item.querySelector(selectors[key]);
                    obj[key] = input ? input.value : '';
                }
                return obj;
            });
        };

        const data = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            links: document.getElementById('links').value,
            objective: document.getElementById('objective').value,
            skills: document.getElementById('skills').value,
            certifications: document.getElementById('certifications').value,

            education: collectDynamicData(eduContainer, {
                degree: '.edu-degree-input',
                college: '.edu-college-input',
                year: '.edu-year-input',
                grade: '.edu-grade-input'
            }),

            experience: collectDynamicData(expContainer, {
                role: '.exp-role-input',
                company: '.exp-company-input',
                duration: '.exp-duration-input',
                tech: '.exp-tech-input',
                desc: '.exp-desc-input'
            }),

            projects: collectDynamicData(projContainer, {
                name: '.proj-name-input',
                stack: '.proj-stack-input',
                desc: '.proj-desc-input'
            }),

            achievements: collectDynamicData(achContainer, {
                title: '.ach-title-input',
                date: '.ach-date-input',
                desc: '.ach-desc-input'
            })
        };

        const formatList = (text) => {
            if (!text) return '';
            const items = text.split('\n').filter(line => line.trim().length > 0);
            if (items.length === 0) return '';
            return '<ul>' + items.map(item => `<li>${item.replace(/^-/, '').trim()}</li>`).join('') + '</ul>';
        };

        let resumeHTML = `
            <h1>${data.fullName || 'Your Name'}</h1>
            <div class="contact-info">
                ${data.email || 'email@example.com'} | ${data.phone || '123-456-7890'} ${data.links ? '| ' + data.links : ''}
            </div>
        `;

        if (data.objective) {
            resumeHTML += `
                <h2>CAREER OBJECTIVE</h2>
                <p>${data.objective}</p>
            `;
        }

        if (data.education.length > 0 && data.education.some(e => e.degree)) {
            resumeHTML += `<h2>EDUCATION</h2>`;
            data.education.forEach(edu => {
                if (edu.degree) {
                    resumeHTML += `
                        <div class="edu-block">
                            <p>${edu.degree}</p>
                            <p><strong>${edu.college}</strong> | CGPA: ${edu.grade} | Expected Graduation: ${edu.year}</p>
                        </div>
                    `;
                }
            });
        }

        if (data.skills) {
            resumeHTML += `
                <h2>TECHNICAL SKILLS</h2>
                <p>${data.skills}</p>
            `;
        }

        if (data.experience.length > 0 && data.experience.some(e => e.role)) {
            resumeHTML += `<h2>WORK EXPERIENCE</h2>`;
            data.experience.forEach(exp => {
                if (exp.role) {
                    resumeHTML += `
                        <div class="section-block">
                            <p><strong>${exp.role}</strong> | <strong>${exp.company}</strong> ${exp.duration ? `<span style="float:right">${exp.duration}</span>` : ''}</p>
                            ${exp.tech ? `<p><strong>Technology:</strong> ${exp.tech}</p>` : ''}
                            <div>${formatList(exp.desc)}</div>
                            <div style="margin-bottom: 10px;"></div>
                        </div>
                    `;
                }
            });
        }

        if (data.projects.length > 0 && data.projects.some(p => p.name)) {
            resumeHTML += `<h2>PROJECTS</h2>`;
            data.projects.forEach(proj => {
                if (proj.name) {
                    resumeHTML += `
                        <div class="section-block">
                            <p><span class="proj-title">${proj.name}</span> ${proj.stack ? `- <span class="proj-stack">${proj.stack}</span>` : ''}</p>
                            <p>${proj.desc}</p>
                            <div style="margin-bottom: 8px;"></div>
                        </div>
                    `;
                }
            });
        }

        if (data.certifications) {
            resumeHTML += `
                <h2>CERTIFICATE</h2>
                <div>${formatList(data.certifications)}</div>
            `;
        }

        if (data.achievements.length > 0 && data.achievements.some(a => a.title)) {
            resumeHTML += `<h2>ACHIEVEMENTS & LEADERSHIP</h2><ul>`;
            data.achievements.forEach(ach => {
                if (ach.title) {
                    resumeHTML += `<li><strong>${ach.title}</strong> ${ach.date ? `(${ach.date})` : ''} ${ach.desc ? `- ${ach.desc}` : ''}</li>`;
                }
            });
            resumeHTML += `</ul>`;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = resumeHTML;
        const contentNodes = Array.from(tempDiv.childNodes);

        resumePreview.innerHTML = '';
        resumePreview.className = '';

        const page = document.createElement('div');
        page.className = 'resume-page';
        resumePreview.appendChild(page);

        contentNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
            page.appendChild(node.cloneNode(true));
        });

        downloadBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';
    }

    resumeForm.addEventListener('input', updatePreview);

    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePreview();
        if (window.innerWidth <= 1024) {
            resumePreview.scrollIntoView({ behavior: 'smooth' });
        }
    });

    resetBtn.addEventListener('click', () => {
        resumeForm.reset();

        eduContainer.innerHTML = '';
        expContainer.innerHTML = '';
        projContainer.innerHTML = '';
        achContainer.innerHTML = '';

        addEducation();
        addExperience();
        addProject();
        addAchievement();

        updatePreview();
        window.scrollTo(0, 0);
    });

    downloadBtn.addEventListener('click', () => {
        if (typeof html2pdf === 'undefined') {
            alert('Error: PDF Generator library not loaded. Please check your internet connection.');
            return;
        }

        const originalScrollPos = window.scrollY;
        const tempContainer = document.createElement('div');

        try {
            tempContainer.className = 'pdf-container';
            tempContainer.style.width = '210mm';
            tempContainer.style.margin = '0 auto';
            tempContainer.style.background = 'white';

            const pages = resumePreview.querySelectorAll('.resume-page');
            let hasContent = false;
            console.log("This is hasContent:",hasContent);
            

            pages.forEach(page => {
                if (page.innerText.trim().length > 0) {
                    const pageClone = page.cloneNode(true);
                    pageClone.classList.add('print-mode');
                    pageClone.style.margin = '0';
                    pageClone.style.marginBottom = '0';
                    pageClone.style.boxShadow = 'none';
                    pageClone.style.pageBreakAfter = 'always';

                    tempContainer.appendChild(pageClone);
                    hasContent = true;
                }
            });

            if (!hasContent) {
                alert('No content to generate PDF.');
                return;
            }

            if (tempContainer.lastElementChild) {
                tempContainer.lastElementChild.style.pageBreakAfter = 'auto';
            }

            document.body.classList.add('generating-pdf');
            document.body.appendChild(tempContainer);

            const fullNameInput = document.getElementById('fullName');
            let filename = 'resume.pdf';
            if (fullNameInput && fullNameInput.value.trim()) {
                const safeName = fullNameInput.value.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_');
                filename = `${safeName}.pdf`;
            }

            const opt = {
                margin: 0,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    scrollY: 0,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(tempContainer).save().then(() => {
                document.body.removeChild(tempContainer);
                document.body.classList.remove('generating-pdf');
                window.scrollTo(0, originalScrollPos);
            }).catch(err => {
                console.error('PDF Generation Error:', err);
                alert('PDF Generation Error: ' + err.message);
                if (document.body.contains(tempContainer)) {
                    document.body.removeChild(tempContainer);
                }
                document.body.classList.remove('generating-pdf');
                window.scrollTo(0, originalScrollPos);
            });

        } catch (error) {
            console.error('Unexpected error during PDF generation setup:', error);
            alert('An unexpected error occurred: ' + error.message);
            if (document.body.contains(tempContainer)) {
                document.body.removeChild(tempContainer);
            }
            document.body.classList.remove('generating-pdf');
            window.scrollTo(0, originalScrollPos);
        }
    });

    updatePreview();
});
