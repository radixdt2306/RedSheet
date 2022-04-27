using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels
{
    [Table("GeneratorContextLookups")]
    [Serializable]
    public partial class GeneratorContextLookup 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorLookupId { get; set; }

        [Range(1, int.MaxValue)]
        public int GeneratorControllerId { get; set; }

        [Range(1, int.MaxValue)]
        public int GeneratorModelId { get; set; }

    }
}
