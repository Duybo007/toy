import { MdOutlineEventAvailable } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Checkbox from "./ui/checkbox";
import CheckboxSort from "./ui/checkboxSort";

function SideFilter({
  checkboxes,
  handleCheckboxChange,
  productCounts,
  sortOrder,
  setSortOrder,
}: any) {
  return (
    <div className="sticky top-0 p-4 w-full rounded-md">
      <Accordion
        className="w-full uppercase font-bold"
        type="multiple"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase">
            <div className="flex items-center gap-3">
              <MdOutlineEventAvailable />
              <div>availability</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Checkbox
              checkboxes={checkboxes.inStock}
              name="inStock"
              handleCheckboxChange={handleCheckboxChange}
              label="in-stock"
              count={productCounts.inStock}
            />
            <Checkbox
              checkboxes={checkboxes.preOrders}
              name="preOrders"
              handleCheckboxChange={handleCheckboxChange}
              label="pre-orders"
              count={productCounts.preOrders}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="uppercase">
            <div className="flex items-center gap-3">
              <FaRegMoneyBillAlt />
              <div>price</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Checkbox
              checkboxes={checkboxes.zero_to_forty}
              name="zero_to_forty"
              handleCheckboxChange={handleCheckboxChange}
              label="$0 to $40"
              count={productCounts.zero_to_forty}
            />
            <Checkbox
              checkboxes={checkboxes.forty_to_eighty}
              name="forty_to_eighty"
              handleCheckboxChange={handleCheckboxChange}
              label="$40 to $80"
              count={productCounts.forty_to_eighty}
            />
            <Checkbox
              checkboxes={checkboxes.above_eighty}
              name="above_eighty"
              handleCheckboxChange={handleCheckboxChange}
              label="Above $80"
              count={productCounts.above_eighty}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="uppercase">
            <div className="flex items-center gap-1">
              <img
                width="25"
                height="25"
                src="/assets/hero/gundam-icon.png"
                alt="mobile-suit-gundam"
              />
              <div>series</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Checkbox
              checkboxes={checkboxes.anime}
              name="anime"
              handleCheckboxChange={handleCheckboxChange}
              label="anime"
              count={productCounts.anime}
            />
            <Checkbox
              checkboxes={checkboxes.naruto}
              name="naruto"
              handleCheckboxChange={handleCheckboxChange}
              label="naruto"
              count={productCounts.naruto}
            />
            <Checkbox
              checkboxes={checkboxes.hentai}
              name="hentai"
              handleCheckboxChange={handleCheckboxChange}
              label="hentai"
              count={productCounts.hentai}
            />
            <Checkbox
              checkboxes={checkboxes.disney}
              name="disney"
              handleCheckboxChange={handleCheckboxChange}
              label="disney"
              count={productCounts.disney}
            />
            <Checkbox
              checkboxes={checkboxes.one_piece}
              name="one_piece"
              handleCheckboxChange={handleCheckboxChange}
              label="one piece"
              count={productCounts.one_piece}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="uppercase">
            <div className="flex items-center gap-3">
              <TiArrowUnsorted />
              <div>sort</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-3 flex flex-col">
              <CheckboxSort
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                value="bestSelling"
                label="Best Selling"
              />
              <CheckboxSort
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                value="priceLowToHigh"
                label="Price Low to High"
              />
              <CheckboxSort
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                value="priceHighToLow"
                label="Price High to Low"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SideFilter;
