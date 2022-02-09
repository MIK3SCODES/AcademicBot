package extrac;

/**
 *
 * @author Osama
 */
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.util.*;
import java.io.FileWriter;

public class Extrac {

    static void saveAsFile(FileWriter fw, List<Article> articles) throws IOException {
        Iterator<Article> it = articles.iterator();
        it.next();
        fw.write('[');
        for (Article a : articles) {
            fw.write("\n" + " {" + "\n"
                    + "\"Title" + "\": " + "\"" + a.title + "\"" + "," + "\n"
                    + "\"Link" + "\": " + "\"" + a.url + "\"" + "," + "\n"
                    + "\"Published" + "\": " + "\"" + a.published + "\"" + "," + "\n"
                    + "\"pdfLink" + "\": " + "\"" + "https://dl.acm.org" + a.pdfLink + "\"" + "," + "\n"
                    + "\"TotalDownloads" + "\": " + "\"" + a.totalDownloads + "\"" + "," + "\n"
                    + "\"TotalCitations" + "\": " + "\"" + a.totalCitations + "\"" + "," + "\n"
                    + "\"abstractt" + "\": " + "\"" + a.abstractt + "\""
                    + "," + "\n");
            fw.write("\"Authors" + "\":" + " [");
            Iterator<String> itr = a.authors.iterator();
            itr.next();
            for (String b : a.authors) {
                fw.write("\"" + b + "\"");
                if (itr.hasNext()) {
                    itr.next();
                    fw.write(", ");

                }
            }
            fw.write(']' + "\n" + "}");

            if (it.hasNext()) {
                fw.write(',');
                it.next();
            }
        }
        fw.write("\n" + ']');
    }

    public static void main(String[] args) throws IOException {
        Ext bwc = new Ext();
        bwc.getPageLinks("https://dl.acm.org/doi/proceedings/10.1145/3475738");
        bwc.getData();
        List<Article> articles = bwc.getData();
        try ( FileWriter fw = new FileWriter("/Users/seles/Desktop/proj/output.json")) {
            saveAsFile(fw, articles);

        }

    }

}

class Ext {

    ArrayList<String> links;

    public Ext() {
        links = new ArrayList<>();

    }

    //Find all URLs that start with "href*=\"doi/10.1145/" and add them to the HashSet.
    public void getPageLinks(String URL) {
        try {
            Document document = Jsoup.connect(URL).get(); //
//i can use userAgent so the web won't detect the request is comming from non-user application.
            Elements otherLinks = document.select("a[href*=\"doi/10.1145/\"]");//get article links at first page that starts with doi/10.1145.
            for (Element link : otherLinks) { //Element: go through objects of Elements.
                String linkHref = link.attr("href"); //get the links using attr("href")
                links.add("https://dl.acm.org" + linkHref); //add articles links to arrays so i can access them in getData().
            }

        } catch (IOException e) {
            System.err.println(e.getMessage());
        }

    }

    public Article getDataFromLink(String url) throws IOException {
        Article ar = new Article();
        ar.url = url;
        Document document = Jsoup.connect(url).get();

        Elements el = document.select("h1.citation__title"); // on the web html h1 is tag and "citation__title" is the class name that has the titles as a child.
        for (Element tit : el) {
            ar.title = tit.text();
            // System.out.println("Title : " + title);
        }
        // System.out.println("Link : " + links.get(i));    //printout links.
        Elements ell = document.select("span.loa__author-name");
        for (Element tit : ell) {
            String author = tit.text();
            ar.authors.add(author);
            //  System.out.println("Authors : " + author);
        }
        Elements elll = document.select("span.CitationCoverDate");
        for (Element tit : elll) {
            ar.published = tit.text();
            //  System.out.println("Published : " + published);
        }
        Elements ellll = document.select("a[href*=\"doi/pdf/10.1145/\"]");
        for (Element tit : ellll) {
            ar.pdfLink = tit.attr("href");
            // System.out.println("PDF Link :https://dl.acm.org" + pdfLink);
        }
        Elements elllll = document.select("span.metric");
        for (Element tit : elllll) {
            ar.totalDownloads = tit.text();
            // System.out.println("Total Downloads: " + totalDownloads);
        }
        Elements ellllll = document.select("span.citation");
        for (Element tit : ellllll) {
            ar.totalCitations = tit.text();
            // System.out.println("Total Citations : " + totalCitations);
        }
        Elements elllllll = document.select("div.abstractInFull");
        for (Element tit : elllllll) {
            ar.abstractt = tit.text();

        }
        return ar;
    }

    public List<Article> getData() throws IOException {
        List<Article> articles = new ArrayList<>();
        for (int i = 0; i < links.size(); i++) { //loop through the links to extract the data i want.
            Article ar = getDataFromLink(links.get(i));
            articles.add(ar);

        }
        return articles;
    }
}
