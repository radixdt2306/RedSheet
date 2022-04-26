using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels

{
    [Table("GeneratorContextViews")]
    [Serializable]
    public partial class GeneratorContextView 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorContextViewId { get; set; }

        [Range(1, int.MaxValue)]
        public int GeneratorContextId { get; set; }

        [Range(1, int.MaxValue)]
        public int GeneratorModelId { get; set; }

    }
}
