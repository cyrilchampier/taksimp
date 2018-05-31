FactoryBot.define do
  factory :project do
    name 'Clean house'
    color '#FFFFFF'
  end

  factory :task do
    association :project, strategy: :build
    name 'Floor'
    description  'Use different product for tiles and parquet'
  end

  factory :work do
    association :task, strategy: :build
    descriptions ['Do the kitchen']
  end
end