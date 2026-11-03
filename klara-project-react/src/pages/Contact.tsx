import { useState } from "react";
import { defaultContact } from "../interfaces/Contact";

export default function Contact() {
    const [contact, setContact] = useState(defaultContact);
    const handleSubmit = function(){
        console.log(contact);
    }
  return (
    
    <div className="w-1/2 mx-auto mt-4 bg-slate-400">
      <h1 className="text-2xl font-bold mb-4 text-center bg-yellow-200">Contact Us</h1>

      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            className="w-full p-1 border border-1 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
            value={contact.name} 
            onChange={(e) => setContact({...contact, name: e.target.value})}
            id="name"
            name="name"
            placeholder="Enter your name"

          />
        </div>

        <br />

        <div>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
              className="w-full p-1 border border-1 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
             value={contact.email} 
            onChange={(e) => setContact({...contact, email: e.target.value})}
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label htmlFor="phone">Phone:</label>
          <br />
          <input
            type="tel"
              className="w-full p-1 border border-1 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
             value={contact.phone} 
            onChange={(e) => setContact({...contact, phone: e.target.value})}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>

        <br />

        <div>
          <label htmlFor="subject">Subject:</label>
          <br />
          <input
            type="text"
              className="w-full p-1 border border-1 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
             value={contact.subject} 
            onChange={(e) => setContact({...contact, subject: e.target.value})}
            id="subject"
            name="subject"
            placeholder="Enter subject"
          />
        </div>

        <br />

        <div>
          <label htmlFor="message">Message:</label>
          <br />
          <textarea
            id="message"
              className="w-full p-1 border border-1 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
             value={contact.message} 
            onChange={(e) => setContact({...contact, message: e.target.value})}
            name="message"
            rows={4}
            placeholder="Write your message"
          ></textarea>
        </div>

        <br />

        <button className="bg-[#F14A00] border-3 rounded-md border-emerald-800 text-gray-50 py-2 px-4 hover:bg-emerald-900 hover:border-5 duration-300" onClick={handleSubmit} type="button">Send Message</button>
      </form>
    </div>
  )
}