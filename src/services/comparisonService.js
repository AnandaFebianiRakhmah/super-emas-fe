// src/services/comparisonService.js
import axios from "axios";

const API_BASE_URL = "https://super-emas-be.onrender.com";

export const getComparisonData = async () => {
  try {
    // Hit API langsung dengan cache busting
    const timestamp = new Date().getTime();
    const response = await axios.get(`${API_BASE_URL}/api/comparison-data?t=${timestamp}`, {
      timeout: 10000, // 10 detik timeout
    });
    
    // Validasi response data
    let data = response.data;
    
    console.log("Raw API data in service:", data);
    
    // API mengembalikan object dengan structure: {date, latestUpdate, priceData}
    // priceData adalah object dengan key karat dan value object {buyPrice, buybackPrice}
    if (data && data.priceData && typeof data.priceData === 'object') {
      console.log("priceData object:", data.priceData);
      
      // Convert object to array
      const priceArray = Object.entries(data.priceData).map(([karat, priceObj]) => {
        console.log(`Processing ${karat}:`, priceObj);
        
        // Ambil buybackPrice dari object
        const price = priceObj && typeof priceObj === 'object' 
          ? (priceObj.buybackPrice || priceObj.buyBackPrice || priceObj.price || 0)
          : priceObj;
        
        return {
          karat: karat,
          price: Number(price) || 0
        };
      });
      
      console.log("Converted price array:", priceArray);
      return priceArray;
    }
    
    // Jika data dibungkus dalam object lain
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      // Coba ambil dari property yang umum digunakan
      if (Array.isArray(data.data)) {
        return data.data;
      } else if (Array.isArray(data.results)) {
        return data.results;
      } else if (Array.isArray(data.items)) {
        return data.items;
      }
    }
    
    // Jika sudah array, return langsung
    if (Array.isArray(data)) {
      return data;
    }
    
    // Jika format tidak sesuai
    console.error("API response format not recognized:", data);
    throw new Error("Format data dari API tidak valid");
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    
    // Berikan pesan error yang lebih spesifik
    if (error.code === 'ECONNABORTED') {
      throw new Error("Koneksi timeout. Server membutuhkan waktu terlalu lama untuk merespons.");
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } else if (error.response) {
      // Server merespons dengan status error
      const status = error.response.status;
      if (status === 404) {
        throw new Error("Endpoint API tidak ditemukan.");
      } else if (status === 500) {
        throw new Error("Server mengalami masalah. Silakan coba lagi nanti.");
      } else if (status === 503) {
        throw new Error("Server sedang maintenance. Silakan coba lagi nanti.");
      } else {
        throw new Error(`Server error: ${status}`);
      }
    } else {
      throw error;
    }
  }
};
