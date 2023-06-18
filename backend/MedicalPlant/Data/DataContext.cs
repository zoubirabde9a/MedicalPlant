using Microsoft.EntityFrameworkCore;
using Model;

namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Plant> PlantData { get; set; }
        public DbSet<PlantOrigin> PlantOriginData { get; set; }
        public DbSet<PlantContraindication>  PlantContraindicationData { get; set; }
        public DbSet<PlantContraindicationEntry>  PlantContraindicationEntryData { get; set; }
    }
}