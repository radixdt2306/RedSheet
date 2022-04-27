using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels
{
    [Table("GeneratorModels")]
    [Serializable]
    public partial class GeneratorModel 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorModelId { get; set; }

        [Required]
        [MaxLength(100)]
        public string GeneratorModelName { get; set; }

        [Required]
        [MaxLength(10)]
        public string GeneratorModelType { get; set; }

        [Required]
        public bool IsDataAuditable { get; set; }

        [Required]
        public bool IsRecordAuditable { get; set; }

        [Required]
        public bool IsSoftDelete { get; set; }

        [Required]
        public bool IsAdditionalValidation { get; set; }

        [Required]
        public bool IsDateConversion { get; set; }

    }
}
