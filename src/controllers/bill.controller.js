
import { v1 as uuidv1 } from 'uuid';
import { deleteBillDB, getBillsDB, saveBill } from '../services/bill.service.js';
import ejs from 'ejs'
import puppeteer from "puppeteer";
import path from 'path'
import * as fs from 'fs';
import { handleHttp } from '../utils/error.handle.js'

const dirTemplate = 'src/template'

const toPdf = async (htmlText, cssPath, pdfid) => {
    const pathReports = 'reports';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlText, { waitUntil: 'domcontentloaded' })
    await page.addStyleTag({ path: cssPath })

    await page.emulateMediaType('screen');
    const result = await page.pdf({
        path: `${pathReports}/Bill_${pdfid}.pdf`,
        margin: { top: '0px', right: '50px', bottom: '50px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });
    await browser.close();
    return result;
}

const renderHtmlWithData = async (data) => {

    const result = await ejs.renderFile(path.join(dirTemplate, '', 'bill.ejs'), data);
    return result;

}

const registerBill = async (req, res) => {
    try {
        const uuid = uuidv1();
        const orderDetails = req.body;


        const result = await saveBill({ uuid, ...orderDetails })
        if (result.affectedRows === 0)
            return res.status(500).json({ status: false, message: "Error saving, please try again later" });

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const html = await renderHtmlWithData({ date: today.toDateString(), ...orderDetails }, uuid)

        if (!html) {
            return res.status(200).json({
                save_status: true,
                save_reporte: false,
                message: 'The sale was registered, but the report was not generated, please try again later',
                uuid
            })
        } else {
            const test = await toPdf(html, `${dirTemplate}/styles.css`, uuid)
        }
        res.json({ status: true, message: 'Saved bill', uuid });
    } catch (error) {
        return handleHttp(res, "ERROR SAVE BILL", error)
    }
}

const getPdfBill = async (req, res) => {
    const pathReports = 'reports';
    const orderDetails = req.body;
    const pdfPath = `${pathReports}/Bill_${orderDetails.uuid}.pdf`;
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const html = await renderHtmlWithData({ date: today.toDateString(), ...orderDetails }, orderDetails.uuid)

        if (!html) {
            return res.status(200).json({
                save_status: true,
                save_reporte: false,
                message: 'The sale was registered, but the report was not generated, please try again later',
                uuid
            })
        } else {
            await toPdf(html, `${dirTemplate}/styles.css`, orderDetails.uuid)
            res.contentType("application/pdf");
            fs.createReadStream(pdfPath).pipe(res);
        }
    }
}

const getBills = async (req, res) => {
    try {
        const response = await getBillsDB();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET BILLS', e)
    }
}

const deleteBill = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteBillDB(id);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Bill not found" });

        res.json({ status: true, message: 'Bill deleted' });
    } catch (error) {
        return handleHttp(res, "ERROR DELETE BILL", error)
    }
}


export { registerBill, getBills, deleteBill, getPdfBill }