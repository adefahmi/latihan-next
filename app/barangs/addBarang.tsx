'use client'
import { SyntheticEvent, useState } from 'react';
// router
import { useRouter } from 'next/navigation'

export default function AddBarang() {
    const [modal, setModal] = useState(false);
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState(0);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        setIsMutating(true);

        const res = await fetch('http://localhost:5000/barangs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama,
                harga
            })
        });

        // wait 1 second
        await new Promise(resolve => setTimeout(resolve, 300));

        const barang = await res.json();

        if (barang) {
            setNama('');
            setHarga(0);
            setModal(false);

            router.refresh();

            setIsMutating(false);
        }

    }

    function toggleModal() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={toggleModal} >Add</button>

            <input type="checkbox" className="modal-toggle" checked={modal} onChange={toggleModal} />
 
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Form Tambah Barang</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Barang</span>
                            </label>
                            <input type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)} 
                                placeholder="Nama Barang" 
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Harga Barang</span>
                            </label>
                            <input type="number"
                                value={harga}
                                onChange={(e) => setHarga(parseInt(e.target.value))}
                                placeholder="Harga Barang" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button type='button' className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                            {!isMutating ? (
                                <button type='submit' className="btn btn-primary">Submit</button>
                            ) : (
                                <button type='button' className="btn btn-disabled">Saving</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
