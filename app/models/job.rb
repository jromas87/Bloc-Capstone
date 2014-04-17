class Job < ActiveRecord::Base
  belongs_to :state
  belongs_to :country
  belongs_to :project_phase
  belongs_to :project_type
  belongs_to :sachse_group
  belongs_to :union
  belongs_to :contract_type

  has_many :staff_assignments
  has_many :project_roles, through: :staff_assignments

  validates :name, presence: true

end