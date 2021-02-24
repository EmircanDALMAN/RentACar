﻿using Microsoft.EntityFrameworkCore;
using ReCapProject.Entities.Concrete;

namespace ReCapProject.DataAccess.Concrete.Contexts
{
    public class RecapProjectDbContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server = (localdb)\MSSQLLocalDb; Database = RecapProjectDb; Trusted_Connection=true");
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Rental> Rentals { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Car> Cars { get; set; }

    }
}
