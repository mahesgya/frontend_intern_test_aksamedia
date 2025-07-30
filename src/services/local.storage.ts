const LocalStorageService = {
  loadState: <T>(key: string): T | undefined => {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return undefined;
      }
      return JSON.parse(data) as T;
    } catch (error) {
      console.error("Gagal memuat data dari localStorage", error);
      return undefined;
    }
  },

  saveState: <T>(key: string, state: T): void => {
    try {
      const data = JSON.stringify(state);
      localStorage.setItem(key, data);
    } catch (error) {
      console.error("Gagal menyimpan data ke localStorage", error);
    }
  }
};

export default LocalStorageService
