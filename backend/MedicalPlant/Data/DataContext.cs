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
        public DbSet<VegetableReign> VegetableReignData { get; set; }
        public DbSet<PlantDivision> PlantDivisionData { get; set; }
        public DbSet<PlantClass> PlantClassData { get; set; }
        public DbSet<PlantFamily> PlantFamilyData { get; set; }
        public DbSet<PlantGenre> PlantGenreData { get; set; }
        public DbSet<PlantSpecies> PlantSpeciesData { get; set; }
        public DbSet<PlantPart> PlantPartData { get; set; }
        
        public DbSet<PlantConstituent> PlantConstituentData { get; set; }
        public DbSet<PlantConstituentEntry> PlantConstituentEntryData { get; set; }
        public DbSet<PlantEffect> PlantEffectData { get; set; }
        public DbSet<PlantEffectEntry> PlantEffectEntryData { get; set; }
        public DbSet<PlantIndication> PlantIndicationData { get; set; }
        public DbSet<PlantIndicationEntry> PlantIndicationEntryData { get; set; }
        public DbSet<PlantNegativeEffect> PlantNegativeEffectData { get; set; }
        public DbSet<PlantNegativeEffectEntry> PlantNegativeEffectEntryData { get; set; }

        public DbSet<PlantContraindication>  PlantContraindicationData { get; set; }
        public DbSet<PlantContraindicationEntry>  PlantContraindicationEntryData { get; set; }
    }
}