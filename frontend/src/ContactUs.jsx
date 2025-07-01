function ContactUs() {
  return (
    <div className="p-20">
      <h1 className="text-3xl lg:text-6xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        Have a question, idea, or feedback? We'd love to hear from you. Use the form below or reach out through the provided channels.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 py-8">
        {/* Contact form */}
        <form className="space-y-4">
          <fieldset className="bg-base-200 border-base-300 rounded-box w-full border p-6">
            <legend className="text-lg font-semibold">Send a Message</legend>

            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" className="input input-bordered w-full" placeholder="John Doe" />

            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" className="input input-bordered w-full" placeholder="you@example.com" />

            <label className="label"><span className="label-text">Message</span></label>
            <textarea className="textarea textarea-bordered w-full" placeholder="Your message..."></textarea>
   
            <button className="btn btn-primary mt-4" type="submit">Send Message</button>
          </fieldset>
        </form>

        {/* Contact details */}
        <div className="space-y-2 p-6">
          <h2 className="text-2xl font-semibold">Reach Out</h2>
          <p><strong>Email:</strong> support@telvy.com</p>
          <p><strong>Phone:</strong> +1 123456789</p>
          <p><strong>Address:</strong><br />123 Home,<br />City</p>
          <p>We typically respond within 24 hours during business days.</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
