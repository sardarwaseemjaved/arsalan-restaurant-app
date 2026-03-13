const pb = new PocketBase('/');

async function init() {
    try {
        const items = await pb.collection('menu').getFullList({
            sort: 'category,name',
        });

        const container = document.getElementById('menu-container');
        const nav = document.getElementById('category-nav');

        const groupedMenu = items.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        // Build Nav
        nav.innerHTML = Object.keys(groupedMenu).map(cat =>
            `<a href="#${cat.replace(/\s+/g, '-')}">${cat}</a>`
        ).join('');

        // Build Sections
        container.innerHTML = `
            <div class="paper-container">
                
                ${Object.keys(groupedMenu).map(category => `
                    <section class="category-section" id="${category.replace(/\s+/g, '-')}">
                        <h2 class="category-title">${category}</h2>
                        <div class="category-grid">
                            ${groupedMenu[category].map(item => `
                                <div class="card">
                                    <div class="item-row">
                                        <span class="item-name">${item.name}</span>
                                        <span class="price">$${Math.floor(item.price)}</span>
                                    </div>
                                    <p class="description">${item.description || ''}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                `).join('')}
            </div>
        `;

    } catch (err) {
        console.error("Error:", err);
    }
}
init();