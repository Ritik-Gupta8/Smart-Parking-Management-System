export default {
  template: `
  <div class="m-0 w-100" style="height: calc(100vh - 120px);">
    <div class="position-relative w-100 h-100 p-0">
      <img src="/static/Images/parking_image.webp" alt="Background" class="w-100 position-absolute top-0 start-0 h-100"
        style="object-fit: cover; filter: blur(3px) brightness(0.85); z-index: 0;">
      
      <div class="glass-form-card-container z-2">
        <div class="glass-form-card mx-auto">
          <h3 class="text-center mb-4 fw-bold" style="color: #0c4a6e;">Welcome Back</h3>
          <p v-if="message" class="text-danger fw-semibold text-center mb-3">{{message}}</p>
          
          <div class="form-floating mb-4 position-relative">
            <input type="email" class="form-control custom-input pb-2 pt-4" id="email" v-model="formData.email" placeholder="name@example.com">
            <label for="email" class="text-muted"><i class="bi bi-envelope-fill me-2"></i>Email address</label>
          </div>

          <div class="form-floating mb-4 position-relative">
            <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input pb-2 pt-4 pe-5" id="password" v-model="formData.password" placeholder="Enter your password">
            <label for="password" class="text-muted"><i class="bi bi-lock-fill me-2"></i>Password</label>
            <span class="position-absolute text-muted" style="right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; z-index: 10;" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
            </span>
          </div>

          <div class="d-grid mt-4">
            <button class="btn custom-btn" @click="loginUser">Login to Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  ,
  data() {
    return {
      formData: {
        email: "",
        password: ""
      },
      message: "",
      showPassword: false 
    };
  },
  methods: {
    loginUser() {
      fetch('/api/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.formData)
      })
      .then(async response => {
        const data = await response.json();
        if (response.ok && data["auth-token"]) {
          localStorage.setItem("auth_token", data["auth-token"]);
          localStorage.setItem("id", data.id);
          localStorage.setItem("username", data.username);
          if (data.roles.includes('admin')) {
            this.$router.push('/admin_dash');
          } else {
            this.$router.push('/user_dash');
          }
        } else {
          this.message = data.message || "Login failed. Please try again.";
        }
      })
      .catch(error => {
        console.error("Login Error:", error);
        this.message = "Server error. Please try again later.";
      });
    }
  }
}
