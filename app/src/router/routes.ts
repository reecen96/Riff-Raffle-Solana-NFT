const adminNs = '/admin';

const adminRoutes = {
  HOME: `${adminNs}/`,
  RAFFLES: `${adminNs}/raffles`,
};

const routes = {
  RAFFLES: '/raffles',
  AUCTIONS: '/auctions',
  ADMIN: adminRoutes,
};

export { routes };
