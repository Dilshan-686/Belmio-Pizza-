import belmioLogo from "../assests/logo.jpg";
import instaLogo from "../assests/instagram_logo.jpg";

function Footer() {
  return (
    <footer className="bg-black px-6 sm:px-12 md:px-20 lg:px-32 py-8">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:pt-8 lg:pb-4">
        <div className="md:flex md:justify-between">
          {/* Left section - Logo + Description + Social */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <a href="#" className="flex items-center">
              <img
                src={belmioLogo}
                className="h-12 sm:h-16 mr-3 rounded-full"
                alt="Belmio Logo"
              />
              <span className="self-center text-xl sm:text-2xl font-extrabold whitespace-nowrap text-white">
                BELMIO PIZZA
              </span>
            </a>
            <p className="mt-4 mb-6 text-sm text-gray-300">
              An authentic italian pizzeria right here in Colombo
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/Belmiopizza?mibextid=ZbWKwL"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook page"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/belmiopizza?igsh=YnM0bmdpZGN5ZXI3"
                className="opacity-50 hover:opacity-100"
                aria-label="Instagram page"
              >
                <img src={instaLogo} className="w-6 h-6" alt="Instagram Logo" />
              </a>
            </div>
          </div>

          {/* Right section - Grid with Locations, Services, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3 text-gray-400">
            <div>
              <h2 className="mb-4 text-sm font-extrabold text-white">Locations</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a
                    href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25b1aedf162ab:0x2dc3df881740df18!8m2!3d6.8938806!4d79.9051921!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgESaXRhbGlhbl9yZXN0YXVyYW504AEA!16s%2Fg%2F11n0blz_69?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Athul Kotte
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25097735c61dd:0xf9ad240bf76af948!8m2!3d6.8755645!4d79.9319902!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11c48n48ht?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Thalawathugoda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-extrabold text-white">Services</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Fast Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Healthy Foods
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Reservations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Food Truck
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-extrabold text-white">Contact Us</h2>
              <ul className="list-disc list-inside space-y-2">
                
                  <p>
                    Call :{" "}
                    <a href="tel:+94770123166" className="hover:underline">
                      +94770123166
                    </a>
                  </p>
                
                
                  <p>
                    Email :{" "}
                    <a href="mailto:belmiopizza@gmail.com" className="hover:underline">
                      belmiopizza@gmail.com
                    </a>
                  </p>
                
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            ©Copyright 2025{" "}
            <a href="#" className="hover:underline">
              Belmio Pizza
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:mt-0 space-x-6 justify-center">
            <a
              href="https://www.facebook.com/Belmiopizza?mibextid=ZbWKwL"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook page"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a href="#top" className="opacity-50 hover:opacity-100" aria-label="Instagram page">
              <img src={instaLogo} className="w-5 h-5" alt="Instagram Logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
