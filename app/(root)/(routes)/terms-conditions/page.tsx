import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/ui/PageHeading";
import LegalProse, { LegalIntroNote } from "@/components/legal/LegalProse";

export const metadata: Metadata = {
  title: "Terms & Conditions | V12 Automobil",
};

export default function TermsConditionsPage() {
  return (
    <>
      <nav className="pt-10 text-center font-serif text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-rosso">
          Home
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-bianco">Terms &amp; Conditions</span>
      </nav>

      <PageHeading eyebrow="Legal" title="Terms & Conditions of Business" />

      <LegalProse>
        <LegalIntroNote>
          These terms and conditions govern all contracts for the sale of
          goods and the doing of work by V12 Automobil Limited (&quot;the
          Company&quot;). Please read them carefully before entering into a
          contract with us.
        </LegalIntroNote>

        <p>
          These Conditions apply to all contracts for the sale or for the
          doing of work by V12 Automobil Limited (hereinafter called
          &quot;the Company&quot;) and prevail over any conditions which the
          Customer&apos;s order may purport to impose and which are at
          variance with the same. No modification of these Conditions shall
          be binding upon the Company unless such modifications shall first
          have been specifically authorised in writing by an authorised
          employee of the Company.
        </p>
        <p>
          The only conditions and warranties acknowledged by the Company are
          those made expressly in writing by an authorised employee of the
          Company and, where applicable, contained in sales literature
          specifically referred to in writing by the Company and prepared by
          the manufacturer or producers of the product the subject of this
          contract. Save as aforesaid, any other express, implied or
          statutory condition or warranty, either oral or in writing, is
          expressly excluded from this contract and forms no part of the
          terms upon which this contract is entered into.
        </p>

        <h2>Quotations, Offers and Acceptances</h2>
        <p>
          A quotation is not an offer and may be withdrawn without notice.
          Any order given in respect of a quotation is not binding on the
          Company until accepted by it in writing. All offers of goods from
          stock are subject to the goods remaining unsold at the time of the
          receipt of an order.
        </p>
        <p>
          Quotations, acceptances of orders and contracts are subject to
          cancellation or modification by the Company (without any liability
          on the Company for any direct or consequential loss or damage
          arising therefrom) if the Company is unable to comply with or
          fulfil the same by reason of strike, lockouts, shortage of labour
          or materials, default of subcontractors, war, fire, flood, Act of
          God, restrictions imposed or non-issue of licences by any
          Government, or any cause beyond its reasonable control.
        </p>
        <p>
          The Company reserves the right to increase contract prices in the
          event of increases occurring after the date of quotation in the
          cost of vehicles, labour, materials or transport, and all goods,
          whether the subject of a specific quotation or not, will be
          charged for at the Company&apos;s prices in force at the date of
          delivery.
        </p>
        <p>
          Drawings, weights, dimensions and descriptive matter published or
          referred to by the Company are intended to present only a general
          description. Their subject matter may be altered, corrected or
          cancelled at any time without notice to the Customer, and they
          shall in no circumstances be deemed to be incorporated in or form
          part of the contract.
        </p>

        <h2>Variation or Cancellation</h2>
        <p>
          No accepted orders or other contracts can be cancelled by the
          Customer without the prior written consent of the Company,
          provided always that the Company&apos;s consent to such
          cancellation shall be without prejudice to any rights which the
          Company may have at law.
        </p>
        <p>
          If any delay or expense is caused to the Company through the lack
          of, changes in, or faults to instructions or otherwise, the
          Company reserves the right to increase prices to cover the cost or
          loss occasioned to the Company thereby. All delivery dates
          specified in the contract or in any letter or other document or
          verbally are approximate only, and no responsibility is accepted
          for any delay howsoever incurred or arising or for any direct or
          consequential loss or damage arising therefrom.
        </p>

        <h2>Time</h2>
        <p>
          Delivery dates specified in the contract or in any letter or other
          document or verbally are approximate only and no responsibility is
          accepted for any delay howsoever incurred or arising or for any
          direct or consequential loss or damage arising therefrom.
        </p>

        <h2>Payment</h2>
        <p>
          The Company shall be entitled to ask the Customer for a deposit on
          account of the sale of vehicles, the price of parts and/or the
          price of repair and servicing work, and the Company shall be
          entitled to set off such deposit against the price due from the
          Customer.
        </p>
        <p>
          Where the Company requires a deposit to be paid by the Customer
          and, in the event of cancellation of the order or failure to
          complete the order by the Customer, this deposit will be retained
          by the Company and is non-returnable.
        </p>
        <p>
          Payments relating to new and used vehicle sales must be made by
          way of cleared funds prior to collection/delivery. Payment of all
          invoices shall, unless otherwise agreed in writing, be made in
          full and in line with the payment terms stated on the invoice
          rendered to the Customer.
        </p>

        <h2>Lien</h2>
        <p>
          The Company shall have a general lien on any vehicle on which it
          has done repair and servicing work and on any other property in
          its possession belonging to the Customer for all monies due and
          owing to the Company by the Customer on any invoice or account
          whatsoever. The Company shall be entitled to charge for storage of
          the vehicle at its usual rates during any period in which the
          vehicle is retained by the Company in exercise of any lien.
        </p>
        <p>
          The good title to or property in any vehicles, ancillaries, spare
          parts or other goods will remain with the Company until payment in
          cleared funds has been made in full to the Company.
        </p>

        <h2>Sale of Goods</h2>
        <p>
          If the Customer&apos;s indebtedness to the Company is not
          satisfied within the terms stated on the invoice rendered to the
          Customer in respect of all or part of that indebtedness, the
          Company shall, without notice, be entitled to sell any property of
          the Customer upon which the Company has exercised its lien by
          public auction or private treaty (at the Company&apos;s unfettered
          option). The net proceeds of sale shall first be applied to
          satisfying the indebtedness of the Customer to the Company, and
          any balance shall be paid by the Company to the Customer on
          demand.
        </p>

        <h2>Storage Charges</h2>
        <p>
          If a vehicle is not collected within 24 hours after the time
          indicated or agreed for delivery of the vehicle (or, if no such
          time has been indicated or agreed, the time the Company notifies
          the Customer that the vehicle is ready for collection), the
          Company shall be entitled to charge for storage of the vehicle at
          its usual rates until collection.
        </p>

        <h2>Customer&apos;s Agent</h2>
        <p>
          Any work done or goods supplied in relation to a vehicle, by the
          order of any driver in the Customer&apos;s employ, or by any
          person who is reasonably believed to be acting as the
          Customer&apos;s agent, or by the order of any person to whom the
          Company is entitled to make delivery of the vehicle, shall be paid
          for by the Customer.
        </p>

        <h2>Delivery</h2>
        <p>
          Where in any case a driver who, so far as the Company is aware,
          has authority to collect the vehicle, collects the same, the
          Company shall not be responsible to the Customer for any loss or
          damage resulting on the grounds that such driver had in fact no
          such authority, and this notwithstanding that delivery may have
          been made without payment of the Company&apos;s account. It shall
          not be obligatory upon the Company to seek confirmation of the
          authority of any person reasonably believed to be then, or to have
          been at some time, connected with the Customer.
        </p>

        <h2>Use of Vehicles</h2>
        <p>
          Unless specifically advised to the contrary, the Company will be
          entitled to presume that the Customer intends to use the vehicle
          for the ordinary type of use to which the particular type of
          vehicle is normally applied. No liability will be accepted by the
          Company for loss or damage suffered as a result of the vehicle
          being used for a purpose inconsistent with the above, nor for
          misuse in any other way.
        </p>

        <h2>Driving of Vehicles</h2>
        <p>
          In connection with any inspection, repair or contemplated repair,
          or other purposes for which a vehicle is accepted by the Company,
          testing, taking the vehicle to the storage facility or other
          garages/specialists, demonstrations or other purposes, the
          Customer is deemed, unless express notice in writing is given to
          the contrary, to have authorised the driving of the vehicle on the
          road or elsewhere.
        </p>

        <h2>Warranty and Limitation of Liability</h2>
        <p>
          The Customer shall be entitled to the benefit of any warranty to
          which the Company is entitled as against the manufacturer of parts
          and materials supplied or as against any subcontractor engaged by
          the Company.
        </p>
        <p>
          All work carried out by the Company is warranted against failure
          due to defective workmanship for a period of one month / 1,000
          miles, whichever occurs first. This warranty extends only to
          repairs actually undertaken and does not cover progressive fault
          diagnosis. It does not affect any statutory rights.
        </p>
        <p>
          <strong>Second hand products:</strong> unless otherwise specified
          in writing, second hand products are sold in their existing
          condition without warranty. It is the Customer&apos;s
          responsibility to satisfy themselves as to the condition of such
          products prior to entering into a contract, and the Customer
          hereby accepts that the Company has provided reasonable facilities
          to enable examination of the product prior to contract.
        </p>
        <p>
          Except in the case of consumer transactions, the Company is not
          responsible for loss or damage to vehicles or other property
          whatsoever, however occasioned, except when such loss or damage is
          caused by the negligence or deliberate act of the Company or its
          servants. Under no circumstances will the Company accept liability
          for loss or damage outside its control or for any indirect or
          consequential loss or damage.
        </p>
        <p>
          The Company shall not be liable for direct or consequential loss
          or damage howsoever caused to the contents of customers&apos;
          vehicles or any resultant damage that may be incurred. The
          Company, its servants and agents shall not be liable for direct or
          consequential loss, damage or injury howsoever caused by work
          carried out or goods supplied.
        </p>
        <p>
          The Company shall not be liable for any failure or loss occasioned
          by the fitment of specialist bodywork or ancillary equipment where
          the Company is not responsible for such specification and supply.
        </p>
        <p>
          The Customer shall indemnify the Company against all claims made
          against the Company as a result of work done in accordance with
          the Customer&apos;s specifications or design which involves the
          infringement of any patents, registered designs, trademark or
          copyright.
        </p>

        <h2>Removed Parts</h2>
        <p>
          All parts removed by the Company in the course of repair and
          servicing work, parts replaced on an exchange basis or parts
          replaced as part of a warranty claim shall, unless prior written
          notice has been given to the contrary by the Customer, be deemed
          to have become the Company&apos;s absolute property with
          immediate effect.
        </p>

        <h2>Complaints</h2>
        <p>
          Any complaints in respect of goods supplied or services performed
          by the Company must be made in writing to the Company no later
          than 14 days after date of invoice or receipt of goods.
        </p>

        <h2>Force Majeure</h2>
        <p>
          The Company shall not be liable for any default due to any act of
          God, war, strike, lock out, industrial action, fire, flood,
          drought, tempest or any other event beyond its reasonable control.
          If we are unable to perform our obligations due to a cause beyond
          our reasonable control we shall give you notice of this fact as
          soon as reasonably practicable after discovering it. If our
          inability to perform our obligations continues for 6 months after
          you receive our notice, then either you or we may give written
          notice, without liability to the other, to terminate the
          contract.
        </p>

        <h2>Notices</h2>
        <p>
          Any notice or other communication given or made in connection with
          these conditions shall be in writing and shall be given to the
          Customer at their last known address. Every notice or
          communication, if so addressed, shall be deemed to have been duly
          given if delivered by hand or sent by mail three business days
          after the date of posting.
        </p>

        <h2>Jurisdiction</h2>
        <p>
          The contract shall in all respects be governed by English law, and
          the Customer hereby irrevocably submits to the jurisdiction of the
          English courts.
        </p>

        <hr />
        <p className="text-sm text-muted/70">
          This page reflects the Terms and Conditions of Business published
          by V12 Automobil at v12automobil.co.uk, adapted here for style
          consistency. If you have any questions, please contact us at
          info@v12automobil.co.uk.
        </p>
      </LegalProse>
    </>
  );
}
