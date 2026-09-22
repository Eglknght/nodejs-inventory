function setupAutocomplete(data_produk) {
    const input_cari = document.getElementById('cari_produk')
    const daftar_saran = document.getElementById('daftar_saran')
    const kotak_chip = document.getElementById('kotak_chip')
    const body_tabel = document.getElementById('body_tabel_produk')

    let produk_terpilih = []

    function render() {
        // Render ulang chip-chip (hapus semua chip lama dulu, kecuali input cari)
        kotak_chip.querySelectorAll('.chip-produk').forEach(el => el.remove())

        produk_terpilih.forEach(function (item) {
            let chip = document.createElement('span')
            chip.className = 'chip-produk badge bg-secondary d-flex align-items-center gap-1'
            chip.innerHTML = `${item.nama} <span style="cursor:pointer;">&times;</span>`

            chip.querySelector('span').addEventListener('click', function () {
                produk_terpilih = produk_terpilih.filter(p => p.kode !== item.kode)
                render()
            })

            kotak_chip.insertBefore(chip, input_cari)
        })

        // Render ulang tabel
        body_tabel.innerHTML = ''
        produk_terpilih.forEach(function (item, index) {
            let baris = document.createElement('tr')
            let kolom_stok = item.stok !== undefined ? `<td>${item.stok}</td>` : ''
            baris.innerHTML = `
            <td>
                ${item.nama}
                <input type="hidden" name="form_produk[]" value="${item.kode}">
            </td>
            <td>${item.kategori_nama || '-'}</td>
            ${kolom_stok}
            <td>
                <input type="number" name="form_jumlah[]" class="form-control" min="1" required>
            </td>
        `
            body_tabel.appendChild(baris)
        })
    }

    input_cari.addEventListener('input', function () {
        let teks = this.value.toLowerCase()
        daftar_saran.innerHTML = ''

        if (teks.length === 0) {
            return
        }

        let hasil_filter = data_produk.filter(function (item) {
            let sudah_dipilih = produk_terpilih.some(p => p.kode === item.kode)
            return item.nama.toLowerCase().includes(teks) && !sudah_dipilih
        })

        hasil_filter.forEach(function (item) {
            let opsi = document.createElement('button')
            opsi.type = 'button'
            opsi.className = 'list-group-item list-group-item-action'
            opsi.textContent = item.nama

            opsi.addEventListener('click', function () {
                produk_terpilih.push(item)
                input_cari.value = ''
                daftar_saran.innerHTML = ''
                render()
            })

            daftar_saran.appendChild(opsi)
        })
    })
}