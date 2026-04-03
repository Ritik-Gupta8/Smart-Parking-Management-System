export default {
  template: `
  <div class="d-flex flex-column vh-100 m-0">
    <div class="flex-grow-1 position-relative p-0 w-100 h-100">
      <img src="/static/Images/parking_image.webp" alt="Background" loading="lazy" class="w-100 position-absolute top-0 start-0 h-100"
        style="object-fit: cover; filter: blur(3px) brightness(0.85); z-index: 0;">
      
      <div class="glass-form-card-container z-2">
        <div class="glass-form-card mx-auto">
          <h2 class="text-center mb-4 fw-bold">Login Form</h2>
        <p v-if="message" class="text-danger fw-semibold text-center mb-3">{{message}}</p>
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">Email address</label>
          <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-envelope-fill text-secondary"></i></span>
            <input type="email" class="form-control" id="email" v-model="formData.email" placeholder="name@example.com">
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label fw-semibold">Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="formData.password" placeholder="Enter your password">
            <span class="input-group-text" style="cursor: pointer;" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
        </div>

        <div class="d-grid">
          <button class="btn btn-primary" @click="loginUser">Login</button>
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
