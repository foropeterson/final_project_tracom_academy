
package entities;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "_User")

public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String email;
  private String password;
  private String vehicleDetails;

  @OneToMany(mappedBy = "user")
  private List<Booking> bookings;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getVehicleDetails() {
    return vehicleDetails;
  }

  public void setVehicleDetails(String vehicleDetails) {
    this.vehicleDetails = vehicleDetails;
  }

  public List<Booking> getBookings() {
    return bookings;
  }

  public void setBookings(List<Booking> bookings) {
    this.bookings = bookings;
  }

  // Getters and Setters
}
