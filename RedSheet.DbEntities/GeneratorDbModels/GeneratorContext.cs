using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels
{
    [Table("GeneratorContexts")]
    [Serializable]
    public partial class GeneratorContext
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorContextId { get; set; }

        [Range(1, int.MaxValue)]
        public int ApplicationModuleId { get; set; }

        public Nullable<int> RootModuleId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ApplicationModuleName { get; set; }

        public bool? IsMainDbContext { get; set; }

        public ICollection<GeneratorController> GeneratorControllers { get; set; } = new HashSet<GeneratorController>();
        public GeneratorContext()
        {
        }

    }
}
