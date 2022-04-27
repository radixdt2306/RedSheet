using Microsoft.EntityFrameworkCore;
using RedSheet.DbEntities.GeneratorDbModels;
using Rx.Core.Data;
using Rx.Core.Settings;

namespace RedSheet.BoundedContext
{
    public class POCOGeneratorContext : DbContext, IGeneratorContext
    {
        public POCOGeneratorContext(ServerSetting serverSetting)
        {
            ServerSetting = serverSetting;
        }

        public DbSet<GeneratorConfiguration> GeneratorConfigurations { get; set; }

        public DbSet<GeneratorContext> GeneratorContexts { get; set; }
        public DbSet<GeneratorContextLookup> GeneratorContextLookups { get; set; }
        public DbSet<GeneratorContextView> GeneratorContextViews { get; set; }
        public DbSet<GeneratorController> GeneratorControllers { get; set; }
        public DbSet<GeneratorModel> GeneratorModels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ServerSetting.Get<string>("dbConnection.generator"));
            base.OnConfiguring(optionsBuilder);
        }

        private ServerSetting ServerSetting;
    }


    public interface IGeneratorContext : IDbContext
    {
    }
}
