using Rx.Core.Data.Attributes;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace RedSheet.DbEntities.GeneratorDbModels
{
    [Table("GeneratorControllers")]
    [Serializable]
    public partial class GeneratorController 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int GeneratorControllerId { get; set; }

        [Range(1, int.MaxValue)]
        public int ApplicationModuleId { get; set; }

        public Nullable<int> RootModuleId { get; set; }

        public Nullable<int> GeneratorModelId { get; set; }

        public Nullable<int> ParentControllerId { get; set; }

        [MaxLength(100)]
        public string ModuleMasterName { get; set; }

        [MaxLength(100)]
        public string ControllerDescription { get; set; }

        [Required]
        public bool ComplexityType { get; set; }

        public Nullable<bool> IsShared { get; set; }

        public Nullable<bool> IsChildrenController { get; set; }

        public Nullable<bool> IsSearchController { get; set; }
        public Nullable<bool> IsDataVerification { get; set; }

        //Relationships
        [RelationshipTableAttribue("GeneratorContexts","dbo")]
        public int GeneratorContextId { get; set; }
        [ForeignKey("GeneratorContextId")]
        public GeneratorContext GeneratorContext { get; set; }

    }
}
