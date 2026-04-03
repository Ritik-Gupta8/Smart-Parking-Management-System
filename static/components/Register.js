export default {
  template: `
  <div class="m-0 w-100" style="height: calc(100vh - 120px);">
    <div class="position-relative w-100 h-100 p-0">
      <img src="/static/Images/parking_image.webp" alt="Background" class="w-100 position-absolute top-0 start-0 h-100"
        style="object-fit: cover; filter: blur(3px) brightness(0.85); z-index: 0;">
      
      <div class="glass-form-card-container z-2">
        <div class="glass-form-card mx-auto">
          <h3 class="text-center mb-3 fw-bold" style="color: #0c4a6e;">Create Account</h3>
          <p class="text-center text-muted mb-4">Join our parking management system</p>
          
          <div class="form-floating mb-3 position-relative">
            <input type="email" class="form-control custom-input pb-2 pt-4" id="email" v-model="formData.email" placeholder="name@example.com" required>
            <label for="email" class="text-muted"><i class="bi bi-envelope-fill me-2"></i>Email address</label>
          </div>

          <div class="form-floating mb-3 position-relative">
            <input type="text" class="form-control custom-input pb-2 pt-4" id="username" v-model="formData.username" placeholder="Type a username" required>
            <label for="username" class="text-muted"><i class="bi bi-person-fill me-2"></i>Username</label>
          </div>

          <div class="form-floating mb-3 position-relative">
            <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input pb-2 pt-4 pe-5" id="password" v-model="formData.password" placeholder="Enter your password" required>
            <label for="password" class="text-muted"><i class="bi bi-lock-fill me-2"></i>Password</label>
            <span class="position-absolute text-muted" style="right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; z-index: 10;" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
            </span>
          </div>

          <div class="form-floating mb-4 position-relative">
            <input type="text" class="form-control custom-input pb-2 pt-4" id="pincode" v-model="formData.pincode" placeholder="Enter your pincode" required>
            <label for="pincode" class="text-muted"><i class="bi bi-geo-alt-fill me-2"></i>Pincode</label>
          </div>

          <div class="d-grid mt-2">
            <button class="btn custom-btn" @click="addUser">Register Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      formData: {
        email: "",
        password: "",
        username: "",
        pincode: "",
      },
      showPassword: false
    }
  },
  methods: {
    addUser: function() {
      if (
        !this.formData.email.trim() ||
        !this.formData.username.trim() ||
        !this.formData.password.trim() ||
        !this.formData.pincode.trim()
      ) {
        alert("Please fill in all fields.");
        return;
      }

      fetch('/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        this.$router.push('/login');
      })
      .catch(error => {
        alert("Something went wrong. Please try again.");
        console.error(error);
      });
    }
  }
}
