using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels
{
    [Table("GeneratorConfigurations")]
    [Serializable]
    public partial class GeneratorConfiguration 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorConfigurationId { get; set; }

        [Required]
        public string TableAnnotations { get; set; }

        [Required]
        public string EnttityNameSpaces { get; set; }

        [Required]
        public string ContextNameSpaces { get; set; }

    }
}
