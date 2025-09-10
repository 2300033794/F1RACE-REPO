package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "f1_driver")
public class Driver {
    @Id
    @Column(name = "driver_id")
    private int id;

    @Column(name = "driver_name", nullable = false, length = 50)
    private String name;

    @Column(name = "driver_team", nullable = false, length = 50)
    private String team;

    @Column(name = "driver_country", nullable = false, length = 50)
    private String country;

    @Column(name = "driver_car", nullable = false, length = 50)
    private String car;

    @Column(name = "driver_experience", nullable = false)
    private int experience; // years of racing

    @Column(name = "driver_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "driver_contact", nullable = false, unique = true, length = 20)
    private String contact;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCar() { return car; }
    public void setCar(String car) { this.car = car; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    @Override
    public String toString() {
        return "Driver [id=" + id + ", name=" + name + ", team=" + team + ", country=" + country
                + ", car=" + car + ", experience=" + experience + ", email=" + email
                + ", contact=" + contact + "]";
    }
}
