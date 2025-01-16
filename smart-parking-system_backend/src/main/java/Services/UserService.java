package Services;

import Repositories.UserRepository;
import entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Business logic to register a user
    public User registerUser(String name, String email) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        return userRepository.save(user);  // Calls save method from UserRepository
    }

    // Retrieve user by email
    public User getUserByEmail(String email) {
        return (User) userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
