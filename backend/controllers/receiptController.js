const PDFDocument = require("pdfkit");
const Fee = require("../models/Fee");

const generateFeeReceipt =
  async (req, res) => {
    try {
      const fee =
        await Fee.findById(
          req.params.id
        ).populate("student");

      if (!fee) {
        return res
          .status(404)
          .json({
            message:
              "Fee record not found",
          });
      }

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=receipt-${fee._id}.pdf`
      );

      doc.pipe(res);

      doc.fontSize(22).text(
        "HostelMate Fee Receipt",
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.fontSize(14).text(
        `Student: ${fee.student.name}`
      );

      doc.text(
        `Month: ${fee.month}`
      );

      doc.text(
        `Amount: ₹${fee.amount}`
      );

      doc.text(
        `Status: ${fee.status}`
      );

      doc.text(
        `Payment Date: ${
          fee.paymentDate ||
          "Not Paid"
        }`
      );

      doc.end();
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  generateFeeReceipt,
};