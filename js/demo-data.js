const DEMO_USERS = {
    'admin@vaultcrm.com': { name: 'Admin', role: 'admin', company: 'VaultCRM' },
    'client@vaultcrm.com': { name: 'Sarah Mitchell', role: 'client', company: 'Acme Corp' }
};

const DEMO_CLIENTS = [
    { id: 1, name: 'Sarah Mitchell', email: 'sarah@acmecorp.com', company: 'Acme Corp', projects: 3, invoices: 5, active: true },
    { id: 2, name: 'James Carter', email: 'james@blueridge.io', company: 'BlueRidge Digital', projects: 2, invoices: 3, active: true },
    { id: 3, name: 'Elena Vasquez', email: 'elena@novastudio.com', company: 'Nova Studio', projects: 1, invoices: 2, active: true },
    { id: 4, name: 'David Kim', email: 'david@pulsetech.co', company: 'PulseTech', projects: 4, invoices: 7, active: false }
];

const DEMO_PROJECTS = [
    { id: 1, title: 'Website Redesign', client: 'Sarah Mitchell', status: 'active', deadline: '2025-03-15', budget: 12000, completion: 68, tasksCount: 14 },
    { id: 2, title: 'Mobile App MVP', client: 'James Carter', status: 'active', deadline: '2025-04-01', budget: 24000, completion: 35, tasksCount: 22 },
    { id: 3, title: 'Brand Identity Package', client: 'Elena Vasquez', status: 'completed', deadline: '2025-02-20', budget: 5500, completion: 100, tasksCount: 8 },
    { id: 4, title: 'E-Commerce Platform', client: 'Sarah Mitchell', status: 'active', deadline: '2025-05-10', budget: 32000, completion: 15, tasksCount: 30 },
    { id: 5, title: 'Marketing Dashboard', client: 'David Kim', status: 'on_hold', deadline: '2025-06-01', budget: 8000, completion: 45, tasksCount: 12 }
];

const DEMO_TASKS = {
    1: {
        backlog: [
            { id: 1, title: 'SEO Audit & Recommendations', priority: 'medium', due: '2025-03-10' },
            { id: 2, title: 'Content Migration Plan', priority: 'low', due: null }
        ],
        in_progress: [
            { id: 3, title: 'Homepage Hero Section', priority: 'high', due: '2025-02-28', assignee: 'Admin' },
            { id: 4, title: 'Responsive Navigation', priority: 'urgent', due: '2025-02-25', assignee: 'Admin' }
        ],
        review: [
            { id: 5, title: 'Color System & Typography', priority: 'high', due: '2025-02-20', assignee: 'Admin' }
        ],
        completed: [
            { id: 6, title: 'Wireframes Approval', priority: 'high', due: '2025-02-10', assignee: 'Admin' },
            { id: 7, title: 'Competitor Analysis', priority: 'medium', due: '2025-02-05' },
            { id: 8, title: 'Sitemap Architecture', priority: 'medium', due: '2025-02-01' }
        ]
    }
};

const DEMO_INVOICES = [
    { id: 1, number: 'INV-2025-0001', client: 'Sarah Mitchell', project: 'Website Redesign', status: 'paid', issueDate: '2025-01-15', dueDate: '2025-02-15', subtotal: 4000, taxRate: 10, taxAmount: 400, total: 4400, paidAt: '2025-02-10' },
    { id: 2, number: 'INV-2025-0002', client: 'James Carter', project: 'Mobile App MVP', status: 'sent', issueDate: '2025-02-01', dueDate: '2025-03-01', subtotal: 8000, taxRate: 0, taxAmount: 0, total: 8000, paidAt: null },
    { id: 3, number: 'INV-2025-0003', client: 'Elena Vasquez', project: 'Brand Identity Package', status: 'paid', issueDate: '2025-02-10', dueDate: '2025-03-10', subtotal: 5500, taxRate: 5, taxAmount: 275, total: 5775, paidAt: '2025-02-28' },
    { id: 4, number: 'INV-2025-0004', client: 'Sarah Mitchell', project: 'E-Commerce Platform', status: 'draft', issueDate: '2025-02-20', dueDate: '2025-03-20', subtotal: 10000, taxRate: 10, taxAmount: 1000, total: 11000, paidAt: null },
    { id: 5, number: 'INV-2025-0005', client: 'David Kim', project: 'Marketing Dashboard', status: 'overdue', issueDate: '2025-01-01', dueDate: '2025-02-01', subtotal: 3000, taxRate: 0, taxAmount: 0, total: 3000, paidAt: null }
];

const DEMO_INVOICE_ITEMS = {
    1: [
        { description: 'UX Research & Discovery', quantity: 1, unitPrice: 1500, lineTotal: 1500 },
        { description: 'Wireframe Design (8 pages)', quantity: 1, unitPrice: 2000, lineTotal: 2000 },
        { description: 'Design Revisions', quantity: 2, unitPrice: 250, lineTotal: 500 }
    ],
    2: [
        { description: 'App Architecture & Planning', quantity: 1, unitPrice: 3000, lineTotal: 3000 },
        { description: 'UI/UX Design (20 screens)', quantity: 1, unitPrice: 5000, lineTotal: 5000 }
    ]
};

const DEMO_ASSETS = [
    { id: 1, name: 'brand-guidelines-v2.pdf', mime: 'application/pdf', size: '2.4 MB', uploaded: '2 days ago', project: 'Brand Identity Package' },
    { id: 2, name: 'homepage-mockup.png', mime: 'image/png', size: '1.8 MB', uploaded: '5 days ago', project: 'Website Redesign' },
    { id: 3, name: 'app-wireframes.zip', mime: 'application/zip', size: '12.3 MB', uploaded: '1 week ago', project: 'Mobile App MVP' },
    { id: 4, name: 'logo-final.svg', mime: 'image/svg+xml', size: '48 KB', uploaded: '2 weeks ago', project: 'Brand Identity Package' },
    { id: 5, name: 'product-photos.zip', mime: 'application/zip', size: '45.2 MB', uploaded: '3 weeks ago', project: 'E-Commerce Platform' },
    { id: 6, name: 'meeting-notes-feb.docx', mime: 'application/vnd.openxmlformats', size: '156 KB', uploaded: '1 month ago', project: null }
];

const DEMO_METRICS = {
    admin: {
        totalClients: 4,
        activeProjects: 3,
        pendingInvoices: 2,
        revenueThisMonth: 10175
    },
    client: {
        myProjects: 2,
        openInvoices: 1,
        uploadedFiles: 3
    }
};
