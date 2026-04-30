import { useState } from "react";

export default function ReportListing({ listingId }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReport = async () => {
    if (!reason) {
      alert("Select a reason");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 800));

      console.log({ listingId, reason, details });

      alert("Report submitted");

      setReason("");
      setDetails("");
      setOpen(false);
    } catch (err) {
      alert("Error submitting report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="report-btn" onClick={() => setOpen(true)}>
        ⚠️ Report Listing
      </button>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Report Listing</h2>

            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="">Select reason</option>
              <option value="scam">Scam</option>
              <option value="fake_images">Fake Images</option>
              <option value="wrong_price">Wrong Price</option>
              <option value="not_available">Not Available</option>
            </select>

            <textarea
              placeholder="Additional details (optional)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />

            <div className="modal-actions">
              <button className="cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="submit" onClick={submitReport}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}