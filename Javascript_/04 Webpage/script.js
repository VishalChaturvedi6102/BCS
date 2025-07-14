
// Navbar toggle karne wala


document.getElementById('menu').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

// Image Slider ka code
const sliderImages = [
  "https://imgs.search.brave.com/8MEQEQc-HmJa0eMJbKsy2g-KRkqtZb4N6YNr8xi0kJs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzM0LzQ4LzE5/LzM2MF9GXzEwMzQ0/ODE5NDVfeGU3TVo0/UEdjekp3ZjFSQ1V5/eEhycncxanJ5aDRW/ZnQuanBn",
  "https://imgs.search.brave.com/PPddsIs5skztdpR1HP2iRhMaFG-QYLxeSqjk0m2A6e0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkMz/NzgxLTAwMi9waG90/by9iZW5nYWwtdGln/ZXItaGVhZHNob3Qu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTBMS05XOTZuNEhy/eWNWTG94dGNhajVu/bWhWd3N0aVBtSGFt/Z1lzbHEyQkk9",
  "https://imgs.search.brave.com/8PA6FZoUndsO6NHYpZvKiLPv0maHuuunMOOTIX7gkfk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/MTkyLzIwMS9zbWFs/bC9waG90b3JlYWxp/c3RpYy1pbWFnZS1v/Zi1hLW1hamVzdGlj/LWVhZ2xlLXNvYXJp/bmctaW4tdGhlLXNr/eS1haS1nZW5lcmF0/aXZlLXBob3RvLmpw/Zw",
  "https://imgs.search.brave.com/M7KD1JJOALWLVY4DoiZIxtH-yjhoL_xBpaUSXXouVls/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcx/NjA2NTA0Ny9waG90/by9hLXJhcmUtbG9v/ay1hdC10aGUtbWFq/ZXN0aWMtc25vdy1s/ZW9wYXJkcy1jYXB0/aXZhdGluZy1iZWF1/dHkuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXV1cWR1ZFVh/UHVfSk55WUtub09C/V0J4eUpMeTZPUE85/UkVHaDVtYmFWLU09",
  "https://imgs.search.brave.com/lsqHBh7f_xAX00EVKSb2J0szNLJY1l9gtYMjAajFkQM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MzgxNjE2L3Bob3Rv/L2Nvdy13aXRoLXN1/bmZsb3dlci1pbi1o/ZXItbW91dGguanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXYy/anpubEhrdnRYeEFs/cWNDMnIwV1QwZjYy/NUJuYUh5dDBUbjZk/VHNtTVE9",
  "https://imgs.search.brave.com/PBuoOz0MayMKbCG59VyZVrJtJJ7g64ND77yIdQuATL4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE1/ODI5ODAyL3Bob3Rv/L2dyZWF0LXdoaXRl/LXNoYXJrLWZpbmdz/LWFuZC10ZWV0aC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/Q1h6elBlMTZrb0xY/U0FZQzlPMnpsMlU5/MTN1d3Q3QktfY1BH/bVJUQW9IQT0",
  "https://imgs.search.brave.com/zd_1-LUkOw9R8tDqk9rkba7ZqtTNVu2LBfrbrzcikho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA1/NjUvODAyMS8wODYx/L3QvNjE3L2Fzc2V0/cy83LTE3MDM5NDg4/NjQ2NTYuanBnP3Y9/MTcwMzk0ODg2NQ",
  "https://imgs.search.brave.com/hxzkPP7PmnLf6DcmQjKjAjmgpNaV6aLsfeqP8MoOPQI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzA2LzA4LzIz/LzM2MF9GXzYwNjA4/MjMxOV9mRjQ5QzNz/VkJFTldmUnVrZkVX/R1hRM2dJTzFsRXR4/OC5qcGc"
];

let currentImageIndex = 0;
const slider = document.getElementById("sliderImage");

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
  slider.src = sliderImages[currentImageIndex];
}

// time setting image slide show ke liye
setInterval(showNextImage, 300); s
