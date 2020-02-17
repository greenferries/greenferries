# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_17_103112) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "airports", force: :cascade do |t|
    t.string "country"
    t.string "code"
    t.string "name"
    t.float "latitude"
    t.float "longitude"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.string "country"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "target_airport_code"
    t.integer "geonames_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.integer "imo"
    t.string "wikipedia_url"
    t.string "country"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "official_url"
    t.integer "ships_count"
  end

  create_table "routes", force: :cascade do |t|
    t.bigint "city_a_id", null: false
    t.bigint "city_b_id", null: false
    t.integer "distance_km"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "distance_nms"
    t.integer "ships_count"
    t.index ["city_a_id"], name: "index_routes_on_city_a_id"
    t.index ["city_b_id"], name: "index_routes_on_city_b_id"
  end

  create_table "ship_routes", force: :cascade do |t|
    t.bigint "ship_id"
    t.bigint "route_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "g_co2_per_pax"
    t.index ["route_id"], name: "index_ship_routes_on_route_id"
    t.index ["ship_id"], name: "index_ship_routes_on_ship_id"
  end

  create_table "ships", force: :cascade do |t|
    t.integer "imo"
    t.string "name"
    t.bigint "company_id"
    t.integer "capacity_pax"
    t.string "wikipedia_url"
    t.float "thetis_average_co2_per_pax"
    t.string "data_source"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "wikipedia_thumb_url"
    t.boolean "out_of_scope"
    t.boolean "unknown_routes"
    t.integer "routes_count"
    t.boolean "thetis_monitoring_method_a"
    t.boolean "thetis_monitoring_method_b"
    t.boolean "thetis_monitoring_method_c"
    t.boolean "thetis_monitoring_method_d"
    t.float "thetis_annual_co2_pax"
    t.float "thetis_annual_co2_freight"
    t.float "thetis_annual_co2_total"
    t.float "thetis_average_co2_per_freight"
    t.float "thetis_average_co2_per_distance"
    t.float "thetis_annual_hours_at_sea"
    t.float "thetis_annual_computed_distance"
    t.float "thetis_annual_computed_distance_km"
    t.float "thetis_annual_computed_pax"
    t.float "thetis_annual_computed_freight"
    t.float "thetis_annual_computed_average_speed"
    t.float "thetis_annual_computed_ratio_co2_from_pax"
    t.index ["company_id"], name: "index_ships_on_company_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "routes", "cities", column: "city_a_id"
  add_foreign_key "routes", "cities", column: "city_b_id"
  add_foreign_key "ships", "companies"
end
